---
layout: page
---

<script setup>
import {
  VPTeamPage,
  VPTeamPageTitle,
  VPTeamMembers,
VPTeamPageSection
} from 'vitepress/theme'; 
import { ref } from "vue"; 

const members = [
  {
    avatar: 'avatar.png',
    name: 'God wei',
    title: 'All I need is you!',
    desc: 'developer'
  }
];

const version = ref('0.0.2');
</script>

<VPTeamPage>
  <VPTeamPageTitle>
    <template #title>
      JavaScript Guide 
    </template>
    <template #lead>
      <br>
        version: {{version}} 
        <Badge type="warning" text="alpha"></Badge>
     </template>
  </VPTeamPageTitle>
  <VPTeamMembers
    size="small"
    :members="members"
  />
</VPTeamPage>
