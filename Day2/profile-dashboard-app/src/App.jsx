// App.jsx
import React from 'react';
import ProfileHeader from './ProfileHeader';
import ProfileStats from './ProfileStats';
import SkillBadge from './SkillBadge';
import ProfileCard from './ProfileCard';

const App = () => {
  return (
    <ProfileCard>
      <ProfileHeader 
        name="Chinwe Okoro"
        title="Senior Developer at Paystack"
        avatar="https://static.vecteezy.com/system/resources/previews/019/470/522/non_2x/beautiful-african-american-woman-with-black-curly-hair-on-a-monochrome-beige-background-in-modern-style-illustration-fashion-portrait-of-black-strong-girl-profile-view-black-beauty-concept-vector.jpg" 
      />
      
      <ProfileStats 
        projects={45}
        followers="1.2K"
        following={300}
      />

      <h4 style={{ marginBottom: '0.5rem' }}>Skills:</h4>
      <div>
        <SkillBadge skill="React" level="Expert" />
        <SkillBadge skill="JavaScript" level="Expert" />
        <SkillBadge skill="CSS" level="Intermediate" />
      </div>
    </ProfileCard>
  );
};

export default App;
