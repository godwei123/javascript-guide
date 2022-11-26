---
layout: page
---

<script setup>
import {
  VPTeamPage,
  VPTeamPageTitle,
  VPTeamMembers
} from 'vitepress/theme';

const members = [
  {
    avatar: 'https://avatars.githubusercontent.com/u/40879937?s=400&u=6c587520f828c4d4d9bf329bc1647caee0b42704&v=4',
    name: 'God wei',
    title: 'All I need is you!',
    links: [
      { icon: 'github', link: 'https://github.com/godwei123' },
    ]
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
      version: V0.0.1 <Badge type="warning" text="alpha"></Badge>
     </template>
  </VPTeamPageTitle>
  <VPTeamMembers
    :members="members"
  />
</VPTeamPage>
