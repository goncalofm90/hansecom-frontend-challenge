<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <div className="lg:flex h-screen bg-hansecom-blue">
    <div className="w-full sm:mt-20 lg:mt-0">
      <video className="video-bg w-full sm:h-fit lg:h-full object-cover" autoPlay muted loop>
        <source src="/src/assets/videos/landingvideo.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
    <div
      className="text-center lg:flex lg:flex-col lg:justify-center lg:items-center w-full bg-hansecom-blue sm:pt-10 lg:pt-0"
    >
      <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl mt-5">
        Hansecom Frontend Concept
      </h1>
      <p className="mt-6 text-lg leading-8 text-white p-5">
        HanseCom, an INIT Group company, develops software solutions for local public transport
        companies. We are experts for supraregional mobile ticketing, mobility platforms and
        customer management systems.
      </p>
      <RouterLink to="/users">
        <button
          className="outline hover:bg-hansecom-red hover:outline-none px-8 my-5 py-2 rounded-md text-white font-light transition duration-200 ease-linear"
        >
          Get started
        </button>
      </RouterLink>
    </div>
  </div>
</template>
