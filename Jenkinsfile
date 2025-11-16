pipeline {
    agent any

    environment {
        // Images Docker pour ton projet
        BACKEND_IMAGE  = 'samya16394/jenkins-backend'
        FRONTEND_IMAGE = 'samya16394/jenkins-frontend'
    }

    stages {

        stage('Checkout') {
            steps {
                // Récupérer le code depuis ta nouvelle repo
                git branch: 'main',
                    url: 'https://github.com/OulaliSamya/Jenkins_project',
                    credentialsId: 'github-token'
            }
        }

        stage('Check Docker') {
            steps {
                // Vérifier que Docker est bien accessible depuis l’agent Jenkins (Windows)
                bat 'docker --version'
            }
        }

        stage('Build backend Docker image') {
            steps {
                echo "🐳 Build de l'image backend"
                // On build à partir du Dockerfile situé dans le dossier backend
                bat """
                docker build -t %BACKEND_IMAGE%:%BUILD_NUMBER% -f backend/Dockerfile backend
                docker tag %BACKEND_IMAGE%:%BUILD_NUMBER% %BACKEND_IMAGE%:latest
                """
            }
        }

        stage('Build frontend Docker image') {
            steps {
                echo "🐳 Build de l'image frontend"
                // On build à partir du Dockerfile situé dans le dossier frontend
                bat """
                docker build -t %FRONTEND_IMAGE%:%BUILD_NUMBER% -f frontend/Dockerfile frontend
                docker tag %FRONTEND_IMAGE%:%BUILD_NUMBER% %FRONTEND_IMAGE%:latest
                """
            }
        }

        /*
        // Si tu veux tester les containers localement dans le pipeline,
        // tu peux activer ces stages plus tard (mais ce n’est pas obligatoire).
        stage('Test backend container (optionnel)') {
            steps {
                bat "docker run --rm %BACKEND_IMAGE%:%BUILD_NUMBER%"
            }
        }

        stage('Test frontend container (optionnel)') {
            steps {
                bat "docker run --rm %FRONTEND_IMAGE%:%BUILD_NUMBER%"
            }
        }
        */

        stage('Push to DockerHub') {
            steps {
                echo "📤 Push des images vers DockerHub"

                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {

                    // Login DockerHub avec tes credentials Jenkins
                    bat """
                    docker login -u %DOCKER_USER% -p %DOCKER_PASS%
                    docker push %BACKEND_IMAGE%:%BUILD_NUMBER%
                    docker push %BACKEND_IMAGE%:latest
                    docker push %FRONTEND_IMAGE%:%BUILD_NUMBER%
                    docker push %FRONTEND_IMAGE%:latest
                    """
                }
            }
        }

        stage('Deploy to Azure (à compléter)') {
            when {
                expression { false } // on le bloque pour l'instant, on l’activera quand on fera Azure
            }
            steps {
                echo "🚀 Ici on ajoutera les commandes az pour déployer sur Azure Web App"
            }
        }
    }

    post {
        success {
            echo "✅ Pipeline terminé : build + push Docker OK."
        }
        failure {
            echo "❌ Le pipeline a échoué – regarde les logs dans Jenkins."
        }
    }
}
