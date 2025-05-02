'use client'
import axios from "@/lib/axiosClient"
import { API_CONFIG } from '@/lib/config'

const PreferenceService = {
    async postUserPreference(data) {
        const response = await axios.patch(`/users/preference`, 
                                            data)
        return response.data
    },
    async getSkillsDepartment() {
        try {
            const response = await fetch('/hard_data.json');
            
            if (!response.ok) {
                console.error(`Failed to fetch hard_data.json: ${response.status} ${response.statusText}`);
                throw new Error(`Failed to fetch with status: ${response.status}`);
            }
            
            const data = await response.json();
            console.log("Data from hard_data.json:", data);
            return { data };
        } catch (error) {
            console.error("Error fetching hard_data.json:", error);
            
            try {
                const fallbackResponse = await fetch('./hard_data.json');
                if (fallbackResponse.ok) {
                    const data = await fallbackResponse.json();
                    console.log("Data from fallback path:", data);
                    return { data };
                }
            } catch (fallbackError) {
                console.error("Fallback fetch also failed:", fallbackError);
            }
        }
    }
}

export default PreferenceService;
