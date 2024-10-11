import type { Struct, Schema } from '@strapi/strapi';

export interface SkillSkill extends Struct.ComponentSchema {
  collectionName: 'components_skill_skills';
  info: {
    displayName: 'Skill';
  };
  attributes: {
    name: Schema.Attribute.String;
    rating: Schema.Attribute.Decimal;
  };
}

export interface ExperiencesExperience extends Struct.ComponentSchema {
  collectionName: 'components_experiences_experiences';
  info: {
    displayName: 'Experience';
  };
  attributes: {
    positionTitle: Schema.Attribute.String;
    companyName: Schema.Attribute.String;
    city: Schema.Attribute.String;
    state: Schema.Attribute.String;
    startDate: Schema.Attribute.String;
    endDate: Schema.Attribute.String;
    isCurrentlyWork: Schema.Attribute.Boolean;
    workSummary: Schema.Attribute.Text;
  };
}

export interface EducationEducation extends Struct.ComponentSchema {
  collectionName: 'components_education_educations';
  info: {
    displayName: 'Education';
    description: '';
  };
  attributes: {
    universityName: Schema.Attribute.String;
    degree: Schema.Attribute.String;
    startDate: Schema.Attribute.String;
    endDate: Schema.Attribute.String;
    describtion: Schema.Attribute.Text;
    country: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'skill.skill': SkillSkill;
      'experiences.experience': ExperiencesExperience;
      'education.education': EducationEducation;
    }
  }
}
