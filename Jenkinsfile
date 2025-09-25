pipeline {
    agent { label 'docker-slave' }

    environment {
        DOCKERHUB_USER = 'rohitgavande45'
        DOCKERHUB_CREDENTIALS = 'dockerhub'
        COMPOSE_PROJECT_NAME = 'qbhealthcare'
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/Rohit-Gavande/qb-healthcare.git'
            }
        }

        stage('Build Images') {
            steps {
                sh 'docker build -t ${DOCKERHUB_USER}/qb-backend:latest -f backend/Dockerfile backend'
                sh 'docker build -t ${DOCKERHUB_USER}/qb-frontend:latest -f frontend/Dockerfile frontend'
            }
        }

        stage('Push to Docker Hub') {
            steps {
                withCredentials([usernamePassword(credentialsId: "${DOCKERHUB_CREDENTIALS}", usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    sh 'echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin'
                    sh 'docker push ${DOCKERHUB_USER}/qb-backend:latest'
                    sh 'docker push ${DOCKERHUB_USER}/qb-frontend:latest'
                }
            }
        }

        stage('Deploy with Compose') {
            steps {
                sh 'docker-compose down -v || true'
                sh 'docker-compose up -d'
            }
        }

        stage('Verify Deployment') {
            steps {
                sh 'sleep 15'
                sh 'curl -f http://localhost:8080 || (docker-compose logs && exit 1)'
            }
        }
    }

    post {
        success {
            echo "✅ Build & Deployment successful! Images pushed to Docker Hub."
        }
        failure {
            echo "❌ Pipeline failed. Check logs."
        }
    }
}

