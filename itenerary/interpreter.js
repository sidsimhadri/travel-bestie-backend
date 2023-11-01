import * as usersDao from '../users/users-dao.js';

const ItineraryController = (app) => {
    app.get('/api/results', async (req, res) => {
        const userId = 'YeH3LxMJLjXrNqv5681QfCAKUx32'; // Replace with dynamic user ID if needed.
        const answers = await usersDao.getQuizAnswers(userId);
        
        let interpretedResults = {
            destinationPreference: null,
            tripPurpose: null,
            accommodationPreference: null,
            travelMode: null,
            activityPreference: [],
            foodPreference: [],
            travelPace: null,
            localInteractionLevel: null,
            dealBreakers: [],
            budgetType: null,
        };
        
        answers.forEach(answer => {
            let questionNumber = parseInt(answer.questionNumber);
            
            switch (questionNumber) {
                case 0:
                    interpretedResults.destinationPreference = answer.answer.toLowerCase();
                    break;
                case 1:
                    interpretedResults.tripPurpose = answer.answer.toLowerCase();
                    break;
                case 2:
                    interpretedResults.accommodationPreference = answer.answer.toLowerCase();
                    break;
                case 3:
                    interpretedResults.travelMode = answer.answer.toLowerCase();
                    break;
                case 4:
                    interpretedResults.activityPreference.push(answer.answer.toLowerCase());
                    break;
                case 5:
                    interpretedResults.foodPreference.push(answer.answer.toLowerCase());
                    break;
                case 6:
                    interpretedResults.travelPace = answer.answer.toLowerCase();
                    break;
                case 7:
                    interpretedResults.localInteractionLevel = answer.answer.toLowerCase();
                    break;
                case 8:
                    if (answer.answer !== "None of the above") {
                        interpretedResults.dealBreakers.push(answer.answer.toLowerCase());
                    }
                    break;
                case 9:
                    interpretedResults.budgetType = answer.answer.split(' ')[0].toLowerCase(); // Takes the first word as budget type.
                    break;
                default:
                    console.error("Unexpected question number: ", questionNumber);
            }
        });

        res.json(interpretedResults);
    });
};

export default ItineraryController;
