'use client'
import axios from 'axios'
import { API_CONFIG } from '@/lib/config'


const PreferenceService = {
    async postUserPreference(data) {
        const response = await axios.patch(`${API_CONFIG.BASE_URL}/users/preference`, 
                                            data,
                                            { withCredentials: true })
        return response.data
    },
    async getSkillsDepartment() {
        try {
            const response = await axios.get('/hard_data.json'); 
            return response;
        } catch (error) {
            console.error("Error fetching hard_data.json:", error);
            if (error.response && error.response.status === 404) {
                console.error("File not found at /hard_data.json");
            }
            return null; 
        }
    }
}

export default PreferenceService;
