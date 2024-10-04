import axios from 'axios';

const API_KEY = 'AIzaSyAA674WwoZIkAUfVK_zjmwVjAFlNMrnIaM';
const presentationId = '1IVaClIP3qh7SV3E2K9GWO7pgMEeAb3_Zd9erBVMFmKo'; // Replace with an actual presentation ID

async function getPresentation() {
    try {
        const response = await axios.get(`https://slides.googleapis.com/v1/presentations/${presentationId}?key=${API_KEY}`);
        console.log(response.data);
    } catch (error) {
        console.error('Error fetching presentation:', error);
    }
}

getPresentation();
