export function formatSkillsList(skills) {
  if (!skills || skills.length === 0) return "";

  if (skills.length === 1) {
    return skills[0];
  }

  if (skills.length === 2) {
    return `${skills[0]} and ${skills[1]}`;
  }

  const lastSkill = skills[skills.length - 1];
  const otherSkills = skills.slice(0, -1);
  return `${otherSkills.join(", ")}, and ${lastSkill}`;
}

export function generateDynamicDescription(user) {
  const teachSkills = user?.teach || [];

  if (teachSkills.length > 0) {
    const formattedSkills = formatSkillsList([...teachSkills]);
    return `Helping others master ${formattedSkills}.`;
  }

  return "Passionate about sharing knowledge.";
}
