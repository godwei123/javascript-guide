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

const members = [
  {
    avatar: './avatar.png',
    name: 'God wei',
    title: 'All I need is you!',
    desc: 'developer'
  }
]
</script>

<VPTeamPage>
  <VPTeamPageTitle>
    <template #title>
      JavaScript Guide 
    </template>
    <template #lead>
      <br>
      version: 0.0.1 <Badge type="warning" text="alpha"></Badge>
     </template>
  </VPTeamPageTitle>
  <VPTeamMembers
    size="small"
    :members="members"
  />
</VPTeamPage>
