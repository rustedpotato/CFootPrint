# EcoTrack AI - Carbon Footprint Tracker

EcoTrack AI is a smart, dynamic web application designed to help individuals understand, track, and reduce their carbon footprint through simple actions and personalized insights.

## Chosen Vertical
**Sustainability** - Designing a solution that helps individuals track and reduce their carbon footprint.

## Approach and Logic

### 1. Onboarding & Baseline Calculation
The application begins with a brief onboarding questionnaire that asks users about their primary modes of transportation, dietary habits, and housing situation. Based on these answers, a baseline carbon footprint score is calculated (measured in kg CO₂e).

### 2. Dashboard & Progress Tracking
Users are presented with a clean, visually appealing dashboard built with a custom Vanilla CSS design system (glassmorphism UI). The dashboard displays:
- Their current footprint score compared to a benchmark.
- A visual progress bar indicating their standing (Excellent, Average, Needs Improvement).
- Quick actions they can log to reduce their footprint (e.g., "Ate a vegetarian meal").
- A history of recent reductions.

### 3. Smart AI Assistant
The core of the dynamic experience is the Eco Assistant. It uses contextual logic to provide personalized advice.
- **Logic:** The assistant parses user input for keywords (like "drive", "food", "energy") and references their current score context to offer specific, actionable recommendations (e.g., suggesting "Meatless Mondays" or carpooling).

## How the Solution Works
1. **Initialize:** Clone the repository and run `npm install`.
2. **Run:** Execute `npm run dev` to start the local Vite development server.
3. **Interact:**
   - Complete the initial assessment.
   - Log actions on the dashboard to see your score decrease.
   - Chat with the AI assistant for personalized tips.

## Assumptions Made
1. **AI Integration:** For the purpose of this prototype and to ensure fast, reliable local execution without requiring users to input API keys, the AI logic is currently simulated using a context-aware mock engine based on keywords. In a production environment, this would be hooked up to an LLM API (like Google Gemini).
2. **Scoring Model:** The carbon scoring metric is a simplified aggregate model designed to illustrate the concept. Real-world calculations would require a more complex backend integrating with environmental APIs to provide exact localized CO₂e figures.
3. **Local State:** Data is currently persisted in local React state for demonstration purposes.

## Tech Stack
- React (Vite)
- Vanilla CSS (Custom Design System)
- Lucide React (Icons)
