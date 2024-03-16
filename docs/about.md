---
layout: page
footer: false
---

<script setup>
import {
  VPTeamPage,
  VPTeamPageTitle,
  VPTeamMembers,
VPTeamPageSection
} from 'vitepress/theme';

const members = [
  {
    avatar: 'IMG_2235.jpg',
    name: 'God wei',
    title: 'All I need is you!',
    desc: 'developer'
  }
];

const version = '0.0.2';
</script>

<VPTeamPage>
  <VPTeamPageTitle>
    <template #title>
      JavaScript Guide 
    </template>
    <template #lead>
      <br>
      version: {{version}}
     </template>
  </VPTeamPageTitle>
  <VPTeamMembers :members="members"
  />
</VPTeamPage>
