<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use App\Entity\User;

class SecurityController extends AbstractController
{
    #[Route('/register', name: 'register', methods: ['POST'])]
    public function register(
        Request $request, 
        UserPasswordHasherInterface $passwordHasher, 
        EntityManagerInterface $entityManager
    ): JsonResponse {
        $data = json_decode($request->getContent(), true);

        if (!$data) {
            return new JsonResponse(["success" => false, "message" => "Données invalides"], 400);
        }

        // Vérification des champs obligatoires
        $requiredFields = ['lastname', 'firstname', 'dob', 'email', 'pseudo', 'password', 'gender'];
        foreach ($requiredFields as $field) {
            if (empty($data[$field])) {
                return new JsonResponse(["success" => false, "message" => "Le champ '$field' est obligatoire"], 400);
            }
        }

        // Vérifier si l'utilisateur existe déjà
        if ($entityManager->getRepository(User::class)->findOneBy(['email' => $data['email']])) {
            return new JsonResponse(["success" => false, "message" => "Cet email est déjà utilisé"], 400);
        }

        try {
            $user = new User();
            $user->setLastname($data['lastname']);
            $user->setFirstname($data['firstname']);
            $user->setDob(new \DateTime($data['dob']));
            $user->setGender($data['gender']);
            $user->setEmail($data['email']);
            $user->setPseudo($data['pseudo']);
            $user->setPassword($passwordHasher->hashPassword($user, $data['password']));

            $entityManager->persist($user);
            $entityManager->flush();

            return new JsonResponse(["success" => true, "message" => "Inscription réussie"], 201);
        } catch (\Exception $e) {
            return new JsonResponse(["success" => false, "message" => "Erreur serveur : " . $e->getMessage()], 500);
        }
    }
}

