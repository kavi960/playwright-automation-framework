pipeline {

    agent any

    environment {
        BASE_URL = 'https://automationexercise.com'
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Install Playwright Browsers') {
            steps {
                sh 'npx playwright install'
            }
        }

        stage('Run Playwright Tests') {
            steps {

                withCredentials([

                    usernamePassword(
                        credentialsId: 'chrome-test-account',
                        usernameVariable: 'CHROME_USERNAME',
                        passwordVariable: 'CHROME_PASSWORD'
                    ),

                    usernamePassword(
                        credentialsId: 'firefox-test-account',
                        usernameVariable: 'FIREFOX_USERNAME',
                        passwordVariable: 'FIREFOX_PASSWORD'
                    ),

                    usernamePassword(
                        credentialsId: 'webkit-test-account',
                        usernameVariable: 'WEBKIT_USERNAME',
                        passwordVariable: 'WEBKIT_PASSWORD'
                    )

                ]) {

                    sh 'npx playwright test'

                }
            }
        }
    }

    post {

        always {

            archiveArtifacts(
                artifacts: 'playwright-report/**',
                allowEmptyArchive: true
            )
        }
    }
}