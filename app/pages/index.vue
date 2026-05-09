<template>
  <div class="min-h-screen bg-[#0a0a0a] text-white flex font-sans selection:bg-[#ff6565] selection:text-black">
    
    <!-- Mobile Hamburger Button -->
    <button @click="isMobileMenuOpen = !isMobileMenuOpen" class="lg:hidden fixed top-6 right-6 z-[60] w-12 h-12 bg-[#0f0f0f]/90 backdrop-blur-md border border-gray-800 rounded-full flex items-center justify-center text-white shadow-xl hover:border-[#ff6565] transition-colors">
       <span v-if="!isMobileMenuOpen"><svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg></span>
       <span v-else><svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg></span>
    </button>

    <!-- Mobile Navigation Menu -->
    <Transition name="fade-slide">
      <div v-if="isMobileMenuOpen" class="lg:hidden fixed inset-0 z-[50] flex flex-col justify-center items-center bg-[#050505]/95 backdrop-blur-3xl min-h-screen px-6">
        <div class="absolute top-0 right-0 w-64 h-64 bg-[#ff6565]/10 blur-[80px] rounded-full pointer-events-none"></div>

        <nav class="flex flex-col gap-6 text-center w-full max-w-sm relative z-10 mt-10">
          <a 
            v-for="(item, index) in navItems" 
            :key="item" 
            :href="'#' + item.toLowerCase().replace(' ', '')"
            @click.prevent="scrollToSectionMobile(item)"
            class="text-3xl font-serif font-bold uppercase tracking-widest transition-all duration-300"
            :class="activeNav === item ? 'text-[#ff6565]' : 'text-white hover:text-[#ff6565]'"
          >
            <span class="text-xs text-[#ff6565] mr-2 font-mono block mb-1">0{{index + 1}}</span>
            {{ item }}
          </a>
        </nav>
        
        <div class="mt-16 mb-10 relative z-10 w-full max-w-[200px]">
          <a href="/cv/natthawitresume.pdf" target="_blank" class="w-full py-4 rounded-2xl border border-gray-800 text-gray-400 text-xs font-bold uppercase tracking-widest hover:border-[#ff6565] hover:text-[#ff6565] hover:bg-[#ff6565]/10 transition-all duration-300 flex items-center justify-center gap-2 group">
              <svg class="w-4 h-4 group-hover:-translate-y-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
              Download CV
          </a>
        </div>

        <div class="flex gap-6 mt-auto pb-10">
          <a v-for="social in socials" :key="social.name" :href="social.link" 
             class="text-gray-500 hover:text-[#ff6565] transition-colors duration-300">
             <span v-html="social.svg" class="w-6 h-6 block"></span>
          </a>
        </div>
      </div>
    </Transition>

    <!-- Floating Glassmorphism Navbar (Desktop) -->
    <div class="h-screen sticky top-0 p-6 max-lg:hidden z-20 flex-shrink-0">
      <aside class="w-[280px] bg-[#0f0f0f]/80 backdrop-blur-3xl border border-gray-800/60 rounded-[2rem] p-8 flex flex-col h-full shadow-2xl relative overflow-hidden">
        <!-- Tech highlight glow -->
        <div class="absolute -top-20 -left-20 w-40 h-40 bg-[#ff6565]/20 blur-[50px] rounded-full pointer-events-none"></div>

        <div class="flex items-center gap-4 mb-12 relative z-10">
          <div class="w-14 h-14 bg-gradient-to-tr from-gray-800 to-gray-700 rounded-full overflow-hidden border-2 border-white/10">
            <img src="/images/profile2.jpg" alt="Profile" class="w-full h-full object-cover" />
          </div>
          <div>
            <p class="text-[10px] text-[#ff6565] font-bold uppercase tracking-widest mb-0.5">Student at KMITL</p>
            <h2 class="text-base font-semibold tracking-wide text-white">Natthawit</h2>
          </div>
        </div>

        <nav class="flex flex-col gap-2 text-sm font-medium relative z-10">
          <a 
            v-for="(item, index) in navItems" 
            :key="item" 
            :href="'#' + item.toLowerCase().replace(' ', '')"
            @click.prevent="scrollToSection(item)"
            :class="[
              'flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 group relative overflow-hidden', 
              activeNav === item 
                ? 'bg-white/5 text-white border border-white/10' 
                : 'text-gray-500 hover:text-white hover:bg-white/5 border border-transparent'
            ]"
          >
            <!-- Hover active indicator -->
            <span class="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-1/2 bg-[#ff6565] rounded-r-full transition-all duration-300"
                  :class="activeNav === item ? 'opacity-100' : 'opacity-0 scale-y-0 group-hover:scale-y-100 group-hover:opacity-100'"></span>
                  
            <span class="text-xs font-bold" :class="activeNav === item ? 'text-[#ff6565]' : 'text-gray-700 group-hover:text-[#ff6565]'">0{{index + 1}}</span>
            <span class="tracking-wide">{{ item }}</span>
          </a>
        </nav>
        
        <!-- Bottom Action CTA -->
        <div class="mt-auto relative z-10">
          
          <a href="/pdf/natthawitresume.pdf" target="_blank" class="w-full py-4 rounded-2xl border border-gray-800 text-gray-400 text-xs font-bold uppercase tracking-widest hover:border-[#ff6565] hover:text-[#ff6565] hover:bg-[#ff6565]/10 transition-all duration-300 flex items-center justify-center gap-2 group">
              <svg class="w-4 h-4 group-hover:-translate-y-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
              Download CV
          </a>
        </div>
      </aside>
    </div>

    <!-- MAIN SCROLLABLE WRAPPER -->
    <main id="main-scroll" class="flex-1 relative overflow-y-auto overflow-x-hidden h-screen scroll-smooth">
      
      <!-- IoT Canvas Background Effect -->
      <div class="fixed inset-0 z-0 pointer-events-none w-full h-full">
        <IoTBackground />
      </div>
      
      <!-- HOME SECTION -->
      <section id="home" class="w-full min-h-screen flex flex-col xl:flex-row items-center justify-between p-6 sm:p-10 xl:p-20 pt-20 xl:pt-20 relative z-10 overflow-hidden">
        
        <!-- Animated Background Decor -->
        <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-[#ff6565]/5 rounded-full blur-[100px] home-blob-1 pointer-events-none"></div>
        <div class="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-[#ff6565]/10 rounded-full blur-[120px] home-blob-2 pointer-events-none"></div>

        <!-- Floating Code Snippets -->
        <div class="absolute top-[15%] right-[8%] pointer-events-none z-0 home-code-float hidden xl:block">
          <div class="font-mono text-[10px] text-[#ff6565]/20 leading-relaxed home-code-drift" style="--drift-d:0s">
            <div>const IoT = await connect();</div>
            <div>sensor.read(0x3F);</div>
            <div>mqtt.publish(data);</div>
          </div>
        </div>
        <div class="absolute bottom-[20%] left-[5%] pointer-events-none z-0 home-code-float hidden xl:block">
          <div class="font-mono text-[10px] text-[#ff6565]/15 leading-relaxed home-code-drift" style="--drift-d:2s">
            <div>&lt;template&gt;</div>
            <div>  &lt;NuxtPage /&gt;</div>
            <div>&lt;/template&gt;</div>
          </div>
        </div>

        <!-- Crosshair Decorations -->
        <div class="absolute top-[10%] left-[12%] w-8 h-8 pointer-events-none z-0 home-crosshair hidden xl:block">
          <div class="absolute inset-0 border border-[#ff6565]/15 rounded-full"></div>
          <div class="absolute top-1/2 left-0 w-full h-px bg-[#ff6565]/10"></div>
          <div class="absolute top-0 left-1/2 w-px h-full bg-[#ff6565]/10"></div>
        </div>

        <div class="max-w-2xl w-full xl:pr-12 relative z-10">
          <div class="flex items-center gap-3 mb-6 home-fade-in" style="animation-delay: 0.2s">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-gray-400">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
            </svg>
            <p class="text-gray-300 text-lg font-mono tracking-tighter">/ INITIALIZING_IDENTITY...</p>
          </div>

          <h1 class="text-4xl sm:text-6xl md:text-8xl font-serif leading-[1.1] mb-6 tracking-wide home-title-reveal">
            <span class="block overflow-hidden"><span class="block">AUNG-PAO</span></span>
            <span class="text-[#ff6565] block overflow-hidden"><span class="block">NATTHAWIT</span></span>
          </h1>

          <p class="text-gray-400 text-sm sm:text-base md:text-xl max-w-lg leading-relaxed mb-8 home-fade-in" style="animation-delay: 0.8s">
            Engineering cyber-physical operations. Deeply passionate about <span class="text-white">IoT systems</span>, applied <span class="text-white">Artificial Intelligence</span>, and advancing <span class="text-white">Network Security</span> infrastructure.
          </p>

          <div class="home-fade-in" style="animation-delay: 1.1s">
            <button class="bg-[#ff6565] text-black px-8 py-4 rounded-full font-bold hover:bg-white hover:-translate-y-1 transition-all duration-300 flex items-center gap-3 shadow-[0_0_20px_rgba(255,101,101,0.3)] group home-btn-glow">
              <a href="#projects">See My Projects</a> 
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Profile Card with Holographic Frame -->
        <div class="home-profile-card bg-[#181818] p-4 sm:p-5 rounded-[2rem] sm:rounded-[2.5rem] w-full max-w-[340px] sm:max-w-[420px] flex flex-col items-center border border-gray-800 shadow-2xl mt-8 xl:mt-0 relative z-10 group home-card-float">
          <!-- Glow aura -->
          <div class="absolute -inset-4 bg-gradient-to-r from-[#ff6565]/20 to-transparent opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-700 -z-10"></div>
          
          <!-- Corner Brackets -->
          <div class="home-corner home-corner--tl"></div>
          <div class="home-corner home-corner--tr"></div>
          <div class="home-corner home-corner--bl"></div>
          <div class="home-corner home-corner--br"></div>

          <!-- Orbit Rings -->
          <div class="absolute -top-10 -right-10 w-32 h-32 pointer-events-none z-0 home-orbit-container">
            <div class="absolute inset-0 border border-[#ff6565]/10 rounded-full home-orbit-spin"></div>
            <div class="absolute inset-3 border border-[#ff6565]/5 rounded-full home-orbit-spin-reverse"></div>
            <div class="absolute w-2 h-2 bg-[#ff6565] rounded-full top-0 left-1/2 -translate-x-1/2 home-orbit-spin shadow-[0_0_8px_rgba(255,101,101,0.8)]"></div>
          </div>
          
          <div id="home-portrait-wrapper" class="w-full aspect-[4/5] bg-gray-800 rounded-[2rem] overflow-hidden mb-6 relative border border-gray-800/50">
            <!-- Dual Scanning Lines -->
            <div class="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[#ff6565] to-transparent z-30 home-scanner"></div>
            <div class="absolute top-0 left-0 w-0.5 h-full bg-gradient-to-b from-transparent via-[#ff6565]/40 to-transparent z-30 home-scanner-v"></div>
            
            <!-- Side-by-side sliding container -->
            <div class="portrait-main-slide flex h-full w-[200%] -translate-x-1/2">
              <img src="/images/profile2.jpg" 
                   alt="Natthawit Portrait 2" 
                   class="w-1/2 h-full object-cover" />
              <img src="/images/profile1.jpg" 
                   alt="Natthawit Portrait 1" 
                   class="w-1/2 h-full object-cover" />
            </div>
            
            <!-- HUD Data Overlay -->
            <div class="absolute top-4 left-4 z-20 pointer-events-none home-hud-in">
              <div class="font-mono text-[8px] text-[#ff6565]/60 tracking-widest uppercase leading-loose">
                <div class="home-hud-line" style="--hud-d:0.5s">ID: NATTHAWIT_P</div>
                <div class="home-hud-line" style="--hud-d:0.7s">STATUS: <span class="text-green-400/60">ONLINE</span></div>
                <div class="home-hud-line" style="--hud-d:0.9s">LOC: BANGKOK, TH</div>
              </div>
            </div>

            <!-- Bottom right data -->
            <div class="absolute bottom-4 right-4 z-20 pointer-events-none text-right home-hud-in" style="--hud-d:1.1s">
              <div class="font-mono text-[8px] text-[#ff6565]/40 tracking-widest">
                <div>FRAME: 60FPS</div>
                <div>RES: 4K</div>
              </div>
            </div>
            
            <!-- Decorative Overlay -->
            <div class="absolute inset-0 pointer-events-none rounded-[2rem] z-20 bg-gradient-to-t from-black/50 via-transparent to-black/20"></div>
            
            <!-- Glitch Flash -->
            <div class="absolute inset-0 z-25 pointer-events-none home-glitch-flash"></div>
          </div>

          <!-- Status Indicator -->
          <div class="flex items-center gap-2 mb-4 home-fade-in" style="animation-delay: 1.3s">
            <span class="w-1.5 h-1.5 rounded-full bg-green-400 shadow-[0_0_6px_rgba(74,222,128,0.6)] animate-pulse"></span>
            <span class="font-mono text-[9px] text-gray-500 tracking-widest uppercase">Available for Opportunities</span>
          </div>

          <div class="flex gap-4 mb-2">
            <a v-for="(social, idx) in socials" :key="social.name" :href="social.link" 
               class="w-12 h-12 bg-[#2a2a2a] rounded-full flex items-center justify-center hover:bg-[#ff6565] hover:text-black transition-all duration-300 text-gray-300 shadow-md home-social-pop"
               :style="{ animationDelay: (1.5 + idx * 0.1) + 's' }">
               <span v-html="social.svg" class="w-5 h-5"></span>
            </a>
          </div>
        </div>
      </section>

      <!-- ABOUT SECTION (Slide Tabs) -->
      <section id="aboutme" class="w-full min-h-screen flex flex-col justify-center relative z-10 p-6 sm:p-10 xl:p-20 bg-[#060606]/90 backdrop-blur-3xl border-t border-gray-800/60 overflow-hidden">
        
        <!-- Subtle Tech Grid Background -->
        <div class="absolute inset-0 bg-tech-grid pointer-events-none opacity-40"></div>

        <!-- Decoration light -->
        <div class="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-[#ff6565]/5 to-transparent pointer-events-none"></div>

        <div class="max-w-5xl w-full mx-auto flex flex-col gap-12 relative z-10 gsap-fade-up">
          
          <!-- Header and Tabs Container -->
          <div class="flex flex-col md:flex-row items-start md:items-end justify-between border-b border-gray-800 pb-6 md:pb-8 gap-4 md:gap-8">
            <h2 class="text-4xl sm:text-5xl md:text-7xl font-serif font-bold text-white tracking-widest uppercase dev-title">
              <span class="dev-type-line">About</span><br/>
              <span class="dev-type-line text-[#ff6565]">Me.</span>
            </h2>
            
            <!-- Tab Controls -->
            <div class="flex bg-[#111]/80 backdrop-blur-md p-1 rounded-full border border-gray-800 relative shadow-xl overflow-hidden shrink-0">
              <!-- Active Slide Pill using absolute positioning and translateX -->
              <div class="absolute top-1 bottom-1 w-[calc(33.33%-2px)] bg-[#ff6565] rounded-full transition-transform duration-500 shadow-[0_0_15px_rgba(255,101,101,0.5)]"
                   :style="{ transform: `translateX(${tabs.indexOf(activeTab) * 100}%)`, left: '4px' }"></div>
                   
              <button 
                v-for="tab in tabs" :key="tab"
                @click="activeTab = tab"
                class="relative px-3 sm:px-5 py-2 text-[9px] sm:text-[10px] font-bold tracking-widest uppercase rounded-full transition-colors duration-500 z-10 w-20 sm:w-24"
                :class="activeTab === tab ? 'text-black' : 'text-gray-400 hover:text-white'"
              >
                {{ tab }}
              </button>
            </div>
          </div>

          <!-- Tab Contents Wrapper -->
          <div class="min-h-[400px] sm:min-h-[450px] relative mt-4">
            <Transition name="fade-slide" mode="out-in">
              
              <!-- 1. ABOUT ME TAB — REDESIGNED WITH KEYFRAMES -->
              <div v-if="activeTab === 'About'" class="about-me-panel absolute w-full">

                <!-- === FLOATING AMBIENT PARTICLES === -->
                <div class="about-particles" aria-hidden="true">
                  <span v-for="n in 12" :key="n" class="particle" :style="{ '--i': n }"></span>
                </div>

                <!-- === TOP ROW: Glitch Headline + Identity Card === -->
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-10">

                  <!-- Left: Bio Text with animated entrance -->
                  <div class="flex flex-col gap-5 about-bio">
                    <!-- Glitch tag line -->
                    <div class="glitch-wrapper">
                      <span class="glitch-tag" data-text="&lt;ENGINEER /&gt;">&lt;ENGINEER /&gt;</span>
                    </div>

                    <p class="text-gray-300 text-base leading-relaxed about-line" style="--d:0.1s">
                      <strong class="text-white text-xl font-serif tracking-wide about-name-glow">Hello, I'm Natthawit.</strong><br/>
                      A dedicated engineer architecting cyber-physical operations, bridging the gap between hardware intelligence and digital ecosystems.
                    </p>
                    <p class="text-gray-400 text-sm leading-relaxed about-line" style="--d:0.25s">
                      My journey started with hacking <span class="text-[#ff6565] font-mono">ESP32</span> microcontrollers and evolved into engineering high-performance web applications managing real-time data flows for IoT systems.
                    </p>
                    <p class="text-gray-400 text-sm leading-relaxed about-line" style="--d:0.4s">
                      I blend <span class="text-[#ff6565] font-mono">hardware logic</span> with software elegance — creating solutions as robust conceptually as they are visually.
                    </p>

                    <!-- Animated scan line divider -->
                    <div class="scan-divider"></div>

                    <!-- Status Badges -->
                    <div class="flex flex-wrap gap-3 about-line" style="--d:0.5s">
                      <span class="status-badge"><span class="status-dot"></span>Available for work</span>
                      <span class="status-badge status-badge--mono"><span class="status-dot status-dot--blue"></span>Bangkok, TH</span>
                      <span class="status-badge status-badge--mono">IoT · Web · AI</span>
                    </div>
                  </div>

                  <!-- Right: Holographic Identity Card -->
                  <div class="holo-card">
                    <!-- Shimmer overlay -->
                    <div class="holo-shimmer"></div>
                    <!-- Orbit ring -->
                    <div class="holo-orbit" aria-hidden="true">
                      <div class="holo-orbit__ring ring-1"></div>
                      <div class="holo-orbit__ring ring-2"></div>
                      <div class="holo-orbit__dot"></div>
                    </div>
                    <!-- Card inner content -->
                    <div class="holo-card__body">
                      <div class="holo-card__icon">🚀</div>
                      <h3 class="holo-card__title">Core Objective</h3>
                      <p class="holo-card__text">To construct scalable platforms that simplify complex IoT infrastructures using modern web frameworks and reactive programming paradigms.</p>
                      <!-- Neon stat chips -->
                      <div class="holo-card__stats">
                        <div class="neon-stat"><span class="neon-stat__num" style="--target:5">5+</span><span class="neon-stat__label">Projects</span></div>
                        <div class="neon-stat neon-stat--center"><span class="neon-stat__num" style="--target:3">3+</span><span class="neon-stat__label">Awards</span></div>
                        <div class="neon-stat"><span class="neon-stat__num" style="--target:2">2+</span><span class="neon-stat__label">Years</span></div>
                      </div>
                    </div>
                    <!-- Corner brackets -->
                    <div class="holo-corner holo-corner--tl"></div>
                    <div class="holo-corner holo-corner--tr"></div>
                    <div class="holo-corner holo-corner--bl"></div>
                    <div class="holo-corner holo-corner--br"></div>
                  </div>
                </div>

                <!-- === BOTTOM ROW: Animated Tech Tags === -->
                <div class="tech-ribbon-track" aria-hidden="true">
                  <div class="tech-ribbon">
                    <span v-for="tag in ['Vue.js','Nuxt 3','ESP32','IoT','Python','C++','Node.js','MQTT','TailwindCSS','GSAP','Firebase','Linux']" :key="tag" class="tech-tag">{{ tag }}</span>
                    <!-- Duplicate for seamless loop -->
                    <span v-for="tag in ['Vue.js','Nuxt 3','ESP32','IoT','Python','C++','Node.js','MQTT','TailwindCSS','GSAP','Firebase','Linux']" :key="'dup-'+tag" class="tech-tag" aria-hidden="true">{{ tag }}</span>
                  </div>
                </div>

              </div>

              <!-- 2. EDUCATION TIMELINE TAB -->
              <div v-else-if="activeTab === 'Education'" class="flex flex-col gap-8 relative absolute w-full before:absolute before:inset-0 before:ml-[1.4rem] md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-[#ff6565] before:to-gray-800">
                <div v-for="(item, index) in educations" :key="index" class="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                  <!-- Timeline Node Dot -->
                  <div class="flex items-center justify-center w-12 h-12 rounded-full border-4 border-[#0a0a0a] bg-[#ff6565] text-black shadow-[0_0_15px_rgba(255,101,101,0.5)] shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 transition-transform duration-500 hover:scale-110">
                    <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path></svg>
                  </div>
                  <!-- Vertical Content Card -->
                  <div class="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] p-8 rounded-[2rem] bg-[#111] border border-gray-800 shadow-xl group-hover:border-[#ff6565]/40 transition-colors duration-500 flex flex-col relative overflow-hidden">
                    
                    <div class="flex items-center gap-4 mb-4 relative z-10">
                      <!-- University Logo badge -->
                      <div class="w-14 h-14 rounded-full bg-white p-1.5 shrink-0 grid place-items-center border border-gray-600 shadow-md">
                        <img v-if="item.logo" :src="item.logo" class="w-full h-full object-contain" />
                        <svg v-else class="w-8 h-8 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path></svg>
                      </div>
                      
                      <!-- Header Information -->
                      <div>
                        <time class="text-[10px] md:text-xs font-bold uppercase tracking-widest text-[#ff6565] block mb-1">{{ item.year }}</time>
                        <h3 class="text-lg md:text-xl font-bold text-white leading-tight font-serif min-h-[1.5rem]">{{ item.university }}</h3>
                      </div>
                    </div>
                    
                    <div class="md:pl-[72px] relative z-10">
                      <!-- Major / Subject -->
                      <h4 class="text-xs md:text-sm font-bold text-[#ff6565]/80 mb-3 font-mono tracking-widest uppercase">{{ item.major }}</h4>
                      <!-- Info details -->
                      <p class="text-sm text-gray-400 leading-relaxed">{{ item.info }}</p>
                    </div>

                    <!-- Watermark Logo -->
                    <img v-if="item.logo" :src="item.logo" class="absolute -bottom-10 -right-10 w-40 h-40 object-contain opacity-[0.03] grayscale pointer-events-none" />
                  </div>
                </div>
              </div>

              <!-- 3. SKILLS % TAB -->
              <div v-else-if="activeTab === 'Skills'" class="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10 absolute w-full pt-4">
                <div v-for="(skill, index) in skills" :key="skill.name">
                  <div class="flex items-end justify-between font-bold mb-3">
                    <span class="text-white tracking-widest text-sm drop-shadow-md flex items-center gap-2">
                       <span class="w-1.5 h-1.5 bg-[#ff6565] rounded-full inline-block"></span>
                       {{ skill.name }}
                    </span>
                    <span class="text-[#ff6565] text-sm tabular-nums font-serif">{{ skill.percent }}%</span>
                  </div>
                  <div class="w-full h-3 bg-gray-900 rounded-full overflow-hidden shadow-inner border border-gray-800">
                    <!-- Progress Fill Bar with Custom Animation -->
                    <div class="h-full bg-gradient-to-r from-red-700 to-[#ff6565] rounded-full transition-all duration-1000 ease-out fill-anim relative" 
                         :style="`--fill: ${skill.percent}%`"
                         :key="activeTab">
                         <!-- Glowing head at the end of the bar -->
                         <div class="absolute right-0 top-0 bottom-0 w-6 bg-white/40 blur-[3px] rounded-full mix-blend-overlay"></div>
                    </div>
                  </div>
                </div>
              </div>

            </Transition>
          </div>
        </div>

        <!-- SUBTLE BINARY BACKGROUND DECORATION -->
        <div class="absolute bottom-0 left-0 w-full h-32 pointer-events-none z-0 flex items-end justify-center overflow-hidden">
          
          <!-- Subtle Glowing background base -->
          <div class="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-[#ff6565]/10 to-transparent blur-xl"></div>
          
          <!-- Binary Rain/Columns Wrapper -->
          <div class="absolute bottom-0 w-full flex justify-between items-end px-4 gap-1 opacity-[0.2] mask-edges pb-2 overflow-hidden h-full">
            <!-- Render binary strings acting as data flowing columns -->
            <div v-for="i in 80" :key="i"
                 class="flex-1 font-mono text-[8px] sm:text-[10px] leading-[10px] text-[#ff6565] flex flex-col justify-end text-center binary-col"
                 :style="{ animationDuration: (2 + Math.abs(Math.sin(i*4.3)) * 4) + 's', animationDelay: (Math.cos(i*7.1) * -5) + 's' }">
                 <!-- Deterministic pseudo-random generation of 0 and 1 -->
                 <div v-for="n in 12" :key="n" :class="{'opacity-40': Math.abs(Math.sin(i * n * 17)) > 0.5}">
                   {{ Math.abs(Math.cos(i * n * 23)) > 0.5 ? '1' : '0' }}
                 </div>
            </div>
          </div>
          
          <!-- Tech Overlays framing the Binary wall -->
          <div class="absolute bottom-0 w-full flex justify-between items-end px-10 py-6 z-10">
             <div class="hidden md:block text-[#ff6565] font-mono text-[10px] tracking-[0.3em] font-bold drop-shadow-md opacity-50">
                SYS.CORE // READY
             </div>
             
             <div class="hidden md:block text-[#ff6565] font-mono text-[10px] tracking-[0.3em] font-bold drop-shadow-md text-right opacity-50">
                RATE // 144Hz
             </div>
          </div>
        </div>
      </section>

      <!-- PROJECTS SECTION -->
      <section id="projects" class="w-full min-h-screen flex flex-col relative z-10 p-6 sm:p-10 xl:p-20 bg-[#060606] border-t border-gray-800/60 overflow-hidden">
        
        <!-- Background: Subtle Tech Grid -->
        <div class="absolute inset-0 bg-tech-grid opacity-[0.12] pointer-events-none"></div>

        <!-- Background: Soft Radial Glow (top-right) -->
        <div class="absolute -top-32 -right-32 w-[500px] h-[500px] bg-[#ff6565]/8 rounded-full blur-[120px] pointer-events-none"></div>

        <!-- Background: Faint bottom-left accent -->
        <div class="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#ff6565]/5 rounded-full blur-[100px] pointer-events-none"></div>

        <!-- Background: Decorative corner brackets -->
        <div class="absolute top-8 left-8 w-12 h-12 border-l-2 border-t-2 border-[#ff6565]/15 pointer-events-none rounded-tl-lg"></div>
        <div class="absolute top-8 right-8 w-12 h-12 border-r-2 border-t-2 border-[#ff6565]/15 pointer-events-none rounded-tr-lg"></div>
        <div class="absolute bottom-8 left-8 w-12 h-12 border-l-2 border-b-2 border-[#ff6565]/15 pointer-events-none rounded-bl-lg"></div>
        <div class="absolute bottom-8 right-8 w-12 h-12 border-r-2 border-b-2 border-[#ff6565]/15 pointer-events-none rounded-br-lg"></div>

        <!-- Background: Floating circuit dots -->
        <div class="absolute top-1/4 left-6 flex flex-col gap-3 pointer-events-none opacity-[0.12]">
          <div v-for="n in 6" :key="n" class="w-1 h-1 rounded-full bg-[#ff6565]"></div>
        </div>
        <div class="absolute top-1/3 right-6 flex flex-col gap-3 pointer-events-none opacity-[0.12]">
          <div v-for="n in 4" :key="n" class="w-1 h-1 rounded-full bg-[#ff6565]"></div>
        </div>

        <div class="max-w-6xl w-full mx-auto flex flex-col gap-12 relative z-10 my-auto">
          
          <div class="flex flex-col md:flex-row items-start md:items-end justify-between border-b border-gray-800 pb-6 gap-4 md:gap-6 gsap-fade-up">
            <h2 class="text-4xl sm:text-5xl md:text-7xl font-serif font-bold text-white tracking-widest uppercase dev-title">
              <span class="dev-type-line">My</span><br/>
              <span class="dev-type-line text-[#ff6565]">Projects.</span>
            </h2>
            <!-- Project Category Selector (Replaced SYSTEM_MODULES) -->
            <div class="flex bg-[#111]/80 backdrop-blur-md p-1 rounded-full border border-gray-800 relative shadow-xl overflow-hidden shrink-0">
              <!-- Active Slide Pill -->
              <div class="absolute top-1 bottom-1 w-[calc(33.33%-2px)] bg-[#ff6565] rounded-full transition-transform duration-500 shadow-[0_0_15px_rgba(255,101,101,0.4)]"
                   :style="{ transform: `translateX(${projectCategories.indexOf(selectedProjectCategory) * 100}%)`, left: '1px' }"></div>
                   
              <button 
                v-for="cat in projectCategories" :key="cat"
                @click="selectedProjectCategory = cat"
                class="relative px-5 py-2 text-[10px] font-bold tracking-widest uppercase rounded-full transition-colors duration-500 z-10 w-24 sm:w-28"
                :class="selectedProjectCategory === cat ? 'text-black' : 'text-gray-400 hover:text-white'"
              >
                {{ cat }}
              </button>
            </div>
          </div>

          <!-- Projects Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[400px]">
            <TransitionGroup name="fade-slide">
              <div v-for="(project, index) in filteredProjects" :key="project.title" class="group relative bg-[#111] rounded-[2rem] overflow-hidden transition-shadow duration-500 shadow-2xl gsap-fade-up will-change-transform transform-gpu flex flex-col">
              
              <!-- Red Accent Line (Like Award Section) -->
              <div class="absolute top-0 bottom-0 left-0 w-1.5 bg-[#ff6565] z-30 transition-transform duration-500 group-hover:scale-y-110"></div>

              <!-- Glowing cover on hover -->
              <div class="absolute inset-0 bg-gradient-to-b from-[#ff6565]/0 to-[#ff6565]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10"></div>

              <!-- Project Image -->
              <div class="h-56 w-full bg-gray-800 relative overflow-hidden group-hover:bg-gray-700 transition-colors shrink-0">
                <img v-if="project.image" :src="project.image" alt="Project Mockup" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                <div v-else class="w-full h-full flex items-center justify-center text-gray-600 font-mono text-xs tracking-widest">NO_IMAGE_DATA</div>
                
                <!-- Category Tag -->
                <div class="absolute top-5 left-5 bg-black/80 backdrop-blur-md border border-gray-700 text-[#ff6565] text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest z-20">
                  {{ project.category }}
                </div>
              </div>

              <!-- Content Area -->
              <div class="p-8 relative z-20 flex-1 flex flex-col">
                <div class="flex items-center gap-3 mb-4">
                  <span class="text-gray-500 font-mono text-[10px] uppercase">P.{{ String(index + 1).padStart(2, '0') }}</span>
                  <div class="h-px w-8 bg-gray-700"></div>
                </div>
                
                <h3 class="text-2xl font-bold text-white mb-3 group-hover:text-[#ff6565] transition-colors leading-tight font-serif">{{ project.title }}</h3>
                <p class="text-sm text-gray-400 leading-relaxed mb-8 line-clamp-3">{{ project.description }}</p>
                
                <!-- Action Link (Redesigned UI - Smaller & Bottom Aligned) -->
                <button type="button" @click="openProjectModal(project)" 
                        class="w-full mt-auto flex items-center justify-between px-5 py-3 rounded-xl bg-white/5 border border-white/10 hover:border-[#ff6565]/50 hover:bg-[#ff6565]/10 transition-all duration-300 group/btn shadow-xl overflow-hidden relative outline-none">
                  <!-- Animated background shimmer -->
                  <div class="absolute inset-0 bg-gradient-to-r from-transparent via-[#ff6565]/5 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none"></div>
                  
                  <span class="text-[9px] font-bold text-gray-400 group-hover/btn:text-white uppercase tracking-[0.2em] transition-colors relative z-10">Explore Module</span>
                  
                  <div class="flex items-center justify-center w-8 h-8 rounded-full bg-white/5 border border-white/10 group-hover/btn:bg-[#ff6565] group-hover/btn:border-[#ff6565] group-hover/btn:text-black transition-all duration-300 relative z-10">
                    <svg class="w-4 h-4 transform group-hover/btn:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </button>
              </div>

            </div>
          </TransitionGroup>
          </div>

        </div>
      </section>

      <!-- AWARD SECTION -->
      <section id="award" class="w-full min-h-screen flex flex-col justify-center relative z-10 p-6 sm:p-10 xl:p-20 bg-[#060606] border-t border-gray-800/60">
        
        <!-- Decoration light/grid -->
        <div class="absolute inset-0 bg-tech-grid opacity-[0.15] pointer-events-none"></div>

        <div class="max-w-5xl w-full mx-auto flex flex-col gap-12 relative z-10">
          
          <div class="flex flex-col md:flex-row items-start md:items-end justify-between border-b border-gray-800 pb-6 gap-6 gsap-fade-up">
            <h2 class="text-4xl sm:text-5xl md:text-7xl font-serif font-bold text-white tracking-widest uppercase dev-title">
              <span class="dev-type-line">Honors &</span><br/>
              <span class="dev-type-line text-[#ff6565]">Awards.</span>
            </h2>
            <div class="flex items-center gap-4 text-[#ff6565] font-mono text-xs xl:text-sm tracking-widest bg-[#ff6565]/10 px-5 py-2.5 rounded-full border border-[#ff6565]/20 shadow-[0_0_15px_rgba(255,101,101,0.2)]">
              <span class="animate-pulse w-2 h-2 rounded-full bg-[#ff6565]"></span>
              ACHIEVEMENT_LOG
            </div>
          </div>

          <!-- Awards Stacking Scroll Cards -->
          <div id="award-wrapper" class="relative z-10 w-full mt-10 pb-[30vh]">
            <div v-for="(award, index) in awards" :key="index" 
                 class="award-card sticky w-full min-h-[320px] md:h-[50vh] md:min-h-[350px] mb-8 flex flex-col md:flex-row overflow-hidden rounded-[2rem] bg-[#111] border border-gray-800 shadow-[0_10px_30px_rgba(0,0,0,0.8)] origin-top will-change-transform"
                 :style="{ top: (80 + index * 10) + 'px', zIndex: index }">
                 
              <!-- Left Info -->
              <div class="w-full md:w-1/2 p-6 sm:p-8 md:p-12 flex flex-col justify-center relative bg-gradient-to-br from-[#111] to-[#0a0a0a]">
                <div class="absolute top-0 bottom-0 left-0 w-2 bg-[#ff6565]"></div>
                <!-- Top Badge -->
                <div class="flex items-center gap-2 mb-6">
                  <div class="w-2 h-2 rounded-full bg-[#ff6565]"></div>
                  <span class="text-gray-500 font-mono text-xs tracking-widest uppercase">Honored in</span>
                </div>
                
                <span class="text-[#ff6565] font-serif text-4xl sm:text-5xl md:text-6xl font-bold mb-2 drop-shadow-[0_0_15px_rgba(255,101,101,0.3)]">{{ award.year }}</span>
                <h3 class="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2 leading-tight font-serif">{{ award.title }}</h3>
                <p class="text-gray-400 font-mono text-[10px] sm:text-xs md:text-sm tracking-widest uppercase mb-4 opacity-80">{{ award.organization }}</p>

                <!-- Deco lines -->
                <div class="flex items-center gap-2 max-w-[200px] mb-6">
                  <div class="h-px bg-gray-700 flex-1"></div>
                  <span class="text-gray-600 text-[10px] uppercase font-mono">Verified</span>
                </div>
                
                <!-- Action Button -->
                <button type="button" @click="openAwardModal(award)" class="inline-flex items-center outline-none gap-2 text-[10px] font-bold text-gray-300 hover:text-white transition-colors uppercase tracking-widest mt-auto group/btn w-fit">
                  View Credential
                  <svg class="w-4 h-4 transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </button>
              </div>

              <!-- Right Image FX -->
              <div @click="openAwardModal(award)" 
                   @mousemove="handleAwardMouseMove"
                   @mouseleave="handleAwardMouseLeave"
                   class="w-full md:w-1/2 h-48 sm:h-56 md:h-full relative overflow-hidden bg-black group flex items-center justify-center cursor-pointer">
                 <img v-if="award.image" :src="award.image" class="absolute inset-0 w-full h-full object-cover opacity-80 transition-transform duration-700 group-hover:scale-110 pointer-events-none" />
                 
                 <!-- Hover Backdrop -->
                 <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none"></div>

                 <!-- Hover Arrow Follower (GSAP X/Y Target) -->
                 <div class="award-cursor z-20 pointer-events-none flex items-center justify-center">
                    <!-- Scale Wrapper with CSS Transition -->
                    <div class="w-16 h-16 rounded-full bg-black/80 backdrop-blur-md border border-[#ff6565]/60 flex items-center justify-center opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 shadow-[0_0_20px_rgba(255,101,101,0.5)]">
                       <!-- Up Right Diagonal Arrow -->
                       <svg class="w-6 h-6 text-[#ff6565] transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 17L17 7M17 7H7M17 7V17"></path>
                       </svg>
                    </div>
                 </div>

                 <div class="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-[#0a0a0a] pointer-events-none z-10"></div>
                 
                 <!-- Tech scanner line -->
                 <div class="absolute inset-0 border-l border-[#ff6565]/20 md:border-none pointer-events-none z-0"></div>
                 <div class="absolute top-1/2 left-0 right-0 h-px bg-[#ff6565]/20 pointer-events-none z-0"></div>
              </div>
            </div>
          </div>
          
        </div>
      </section>

      <!-- CONTACT SECTION -->
      <section id="contact" class="w-full min-h-screen flex flex-col justify-center relative z-10 p-6 sm:p-10 xl:p-20 bg-[#060606] border-t border-[#ff6565]/20 overflow-hidden pb-24 sm:pb-32">
        
        <!-- Background elements -->
        <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-[#ff6565]/10 via-[#060606] to-[#060606] pointer-events-none"></div>

        <div class="max-w-6xl w-full mx-auto relative z-10 gsap-fade-up">
          <div class="flex flex-col lg:flex-row items-center gap-8 sm:gap-16">
            
            <!-- Left Info & Terminal Log -->
            <div class="w-full lg:w-1/2 flex flex-col gap-8">
              <div>
                <div class="flex items-center gap-3 mb-4 text-[#ff6565] font-mono tracking-widest text-sm">
                  <span class="w-2 h-2 rounded-sm bg-[#ff6565] animate-pulse"></span>
                  OPEN CONNECTION
                </div>
                <h2 class="text-4xl sm:text-5xl md:text-7xl font-serif font-bold text-white tracking-widest uppercase mb-4 sm:mb-6 leading-tight dev-title">
                  <span class="dev-type-line">Get In</span><br/>
                  <span class="dev-type-line text-[#ff6565]">Contact.</span>
                </h2>
                <p class="text-gray-400 text-lg leading-relaxed">
                  I'm currently open for new opportunities or freelance projects. Whether you have a question or just want to say hi, I'll try my best to get back to you!
                </p>
              </div>

              <!-- Terminal Info Box -->
              <div class="bg-[#0a0a0a] rounded-2xl border border-gray-800 p-6 font-mono text-sm text-gray-400 shadow-2xl relative overflow-hidden group">
                <div class="flex gap-2 mb-4 border-b border-gray-800 pb-4">
                  <div class="w-3 h-3 rounded-full bg-[#ff6565]"></div>
                  <div class="w-3 h-3 rounded-full bg-gray-600"></div>
                  <div class="w-3 h-3 rounded-full bg-gray-600"></div>
                </div>
                <p class="mb-2"><span class="text-[#ff6565]">root@portfolio:~$</span> ping contact_info</p>
                <div class="pl-4 border-l-2 border-gray-800 space-y-3 mt-4 text-xs md:text-sm">
                  <p class="flex items-center gap-3"><svg class="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg> <span class="text-white hover:text-[#ff6565] transition-colors cursor-pointer">natthawitno@gmail.com</span></p>
                  <p class="flex items-center gap-3"><svg class="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg> <span class="text-white">Bangkok, Thailand</span></p>
                </div>
                <!-- Scanning line effect in terminal -->
                <div class="absolute inset-0 bg-gradient-to-b from-transparent via-[#ff6565]/5 to-transparent h-[20%] animate-[binaryFade_3s_linear_infinite] pointer-events-none"></div>
              </div>
            </div>

            <!-- Right Contact Form -->
            <div class="w-full lg:w-1/2 p-8 md:p-12 bg-[#111] border border-gray-800 rounded-[2rem] shadow-2xl relative group">
              <!-- Glow fx -->
              <div class="absolute inset-0 bg-gradient-to-br from-[#ff6565]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-[2rem]"></div>
              
              <form @submit.prevent="submitForm" class="relative z-10 flex flex-col gap-6">
                <!-- Data Field 1 -->
                <div class="flex flex-col gap-2">
                  <label class="text-[10px] text-gray-500 font-mono tracking-widest uppercase">/ Identity_Name</label>
                  <input v-model="form.name" type="text" required placeholder="Enter your name" class="w-full bg-transparent border-b border-gray-700 pb-3 text-white focus:outline-none focus:border-[#ff6565] transition-colors placeholder:text-gray-700 font-sans" />
                </div>
                
                <!-- Data Field 2 -->
                <div class="flex flex-col gap-2">
                  <label class="text-[10px] text-gray-500 font-mono tracking-widest uppercase">/ Connection_Email</label>
                  <input v-model="form.email" type="email" required placeholder="Enter your email address" class="w-full bg-transparent border-b border-gray-700 pb-3 text-white focus:outline-none focus:border-[#ff6565] transition-colors placeholder:text-gray-700 font-sans" />
                </div>
                
                <!-- Data Field 3 -->
                <div class="flex flex-col gap-2">
                  <label class="text-[10px] text-gray-500 font-mono tracking-widest uppercase">/ Payload_Message</label>
                  <textarea v-model="form.message" required rows="4" placeholder="Type your message here..." class="w-full bg-transparent border-b border-gray-700 pb-3 text-white focus:outline-none focus:border-[#ff6565] transition-colors resize-none placeholder:text-gray-700 font-sans"></textarea>
                </div>

                <!-- Alert Messages -->
                <div v-if="submissionStatus === 'success'" class="text-[#ff6565] text-xs font-mono bg-[#ff6565]/10 border border-[#ff6565]/20 p-3 rounded-lg flex items-center gap-2">
                  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                  SIGNAL TRANSMITTED SUCCESSFULLY
                </div>
                <div v-if="submissionStatus === 'error'" class="text-red-500 text-xs font-mono bg-red-500/10 border border-red-500/20 p-3 rounded-lg flex items-center gap-2">
                  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
                  TRANSMISSION FAILED. RETRY.
                </div>

                <!-- Submit Btn -->
                <button type="submit" :disabled="isSubmitting" class="mt-4 w-full bg-white text-black font-bold py-4 rounded-xl flex items-center justify-center gap-3 hover:bg-[#ff6565] hover:text-white hover:shadow-[0_0_20px_rgba(255,101,101,0.5)] transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed">
                  {{ isSubmitting ? 'TRANSMITTING...' : 'TRANSMIT SIGNAL' }}
                  <svg v-if="!isSubmitting" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                  <svg v-else class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                </button>
              </form>
            </div>

          </div>
        </div>
        
        <!-- Footer -->
        <footer class="absolute bottom-0 left-0 w-full p-6 border-t border-gray-800/80 bg-[#060606] z-10 flex flex-col md:flex-row items-center justify-between">
           <p class="text-[10px] font-mono text-gray-600 uppercase tracking-widest">&copy; 2026 NATTHAWIT. ALL RIGHTS RESERVED.</p>
           <p class="text-[10px] font-mono text-gray-600 uppercase tracking-widest hidden md:block">SYS. STATUS: <span class="text-[#ff6565]">ONLINE</span></p>
        </footer>
      </section>

    </main>

    <!-- Project Modal Popup -->
    <Transition name="fade-slide">
      <div v-if="isProjectModalOpen" class="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-10">
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-[#0a0a0a]/90 backdrop-blur-xl" @click="closeProjectModal"></div>
        
        <!-- Modal Content -->
        <div class="relative bg-[#111] border border-gray-800 rounded-[2rem] w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-[0_0_50px_rgba(255,101,101,0.1)] flex flex-col md:flex-row transform transition-all">
          
          <!-- Close Btn -->
          <button @click="closeProjectModal" class="absolute top-4 right-4 md:top-6 md:right-6 w-10 h-10 bg-black/50 hover:bg-[#ff6565] text-white hover:text-black rounded-full flex items-center justify-center transition-colors z-20 backdrop-blur-md border border-gray-700">
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>

          <!-- Left Image -->
          <div class="w-full md:w-1/2 min-h-[250px] md:min-h-[400px] bg-gray-900 overflow-hidden relative">
             <div class="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-transparent z-10 md:hidden"></div>
             <img v-if="selectedProject?.image" :src="selectedProject?.image" class="w-full h-full object-cover opacity-80" />
             <div v-else class="w-full h-full flex items-center justify-center text-gray-600 font-mono text-xs">NO_IMAGE</div>
          </div>

          <!-- Right Content -->
          <div class="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center relative z-10 -mt-10 md:-mt-0">
             <div class="inline-block px-3 py-1 bg-[#ff6565]/10 border border-[#ff6565]/20 text-[#ff6565] text-[10px] font-bold uppercase tracking-widest rounded-full w-fit mb-4">
               {{ selectedProject?.category }}
             </div>
             <h2 class="text-3xl md:text-5xl font-serif font-bold text-white mb-6 leading-tight">{{ selectedProject?.title }}</h2>
             <p class="text-gray-400 text-sm md:text-base leading-relaxed mb-10">{{ selectedProject?.description }}</p>
             
             <!-- Action Button -->
             <a :href="selectedProject?.link" target="_blank" class="w-full sm:w-auto text-center inline-block bg-white text-black px-8 py-4 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-[#ff6565] hover:text-white transition-all shadow-lg hover:-translate-y-1">
               Read More Context
             </a>
          </div>

        </div>
      </div>
    </Transition>

    <!-- Award Modal Popup -->
    <Transition name="fade-slide">
      <div v-if="isAwardModalOpen" class="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-10">
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-[#0a0a0a]/90 backdrop-blur-xl" @click="closeAwardModal"></div>
        
        <!-- Modal Content -->
        <div class="relative bg-[#111] border border-gray-800 rounded-[2rem] w-full max-w-6xl max-h-[90vh] overflow-y-auto shadow-[0_0_50px_rgba(255,101,101,0.1)] flex flex-col md:flex-row transform transition-all">
          
          <!-- Close Btn -->
          <button @click="closeAwardModal" class="absolute top-4 right-4 md:top-6 md:right-6 w-10 h-10 bg-black/50 hover:bg-[#ff6565] text-white hover:text-black rounded-full flex items-center justify-center transition-colors z-20 backdrop-blur-md border border-gray-700">
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>

          <!-- Left Image (Horizontal Optimized) -->
          <div class="w-full md:w-1/2 bg-black/20 overflow-hidden relative flex items-center justify-center border-r border-gray-800/50 min-h-[300px]">
             <div class="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-transparent z-10 md:hidden"></div>
             <img v-if="selectedAward?.image" :src="selectedAward?.image" class="w-full h-full object-contain p-4 md:p-12" />
             <div v-else class="w-full h-full flex items-center justify-center text-gray-600 font-mono text-xs">NO_IMAGE</div>
          </div>

          <!-- Right Content -->
          <div class="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center relative z-10 -mt-10 md:-mt-0">
             <div class="inline-block px-3 py-1 bg-[#ff6565]/10 border border-[#ff6565]/20 text-[#ff6565] text-[10px] font-bold uppercase tracking-widest rounded-full w-fit mb-4">
               {{ selectedAward?.organization }} • {{ selectedAward?.year }}
             </div>
             <h2 class="text-3xl md:text-5xl font-serif font-bold text-white mb-6 leading-tight">{{ selectedAward?.title }}</h2>
             <p class="text-gray-400 text-sm md:text-base leading-relaxed mb-10">This credential honors significant achievements in {{ selectedAward?.organization }}. Official recognition of the award is maintained on the verification platform.</p>
             
             <!-- Action Button -->
             <a :href="selectedAward?.link || '#'" target="_blank" class="w-full sm:w-auto text-center inline-block bg-white text-black px-8 py-4 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-[#ff6565] hover:text-white transition-all shadow-lg hover:-translate-y-1">
               Verify Certificate
             </a>
          </div>

        </div>
      </div>
    </Transition>

  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'

// --- SEO & Web Title ---
useSeoMeta({
  title: 'Natthawit',
  ogTitle: 'Natthawit | Engineering & IoT Portfolio',
  description: 'Engineering cyber-physical operations. Deeply passionate about IoT systems, AI, and Network Security.',
  ogDescription: 'Explore the projects and skills of Natthawit, an IoT and Web Engineer.',
  ogImage: '/images/profile2.jpg',
  twitterCard: 'summary_large_image',
})

const navItems = ['Home', 'About me', 'Projects', 'Award', 'Contact']

// ------------------------------------
// Contact Form Setup & Logic
// ------------------------------------
const form = ref({
  name: '',
  email: '',
  message: ''
})
const isSubmitting = ref(false)
const submissionStatus = ref(null)

const submitForm = async () => {
  isSubmitting.value = true
  submissionStatus.value = null
  
  try {
    // NOTE: Replace 'hello@natthawit.dev' with your real receiving email.
    // FormSubmit demands email activation on the very first API submission.
    // Check your inbox, click activate, and then later submissions will flow automatically.
    const response = await fetch("https://formsubmit.co/ajax/67010328@kmitl.ac.th", {
      method: "POST",
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        name: form.value.name,
        email: form.value.email,
        message: form.value.message,
        _subject: "New Contact Form Transmission [Portfolio]" 
      })
    })

    if (response.ok) {
      submissionStatus.value = 'success'
      form.value = { name: '', email: '', message: '' }
    } else {
      submissionStatus.value = 'error'
    }
  } catch (error) {
    submissionStatus.value = 'error'
  } finally {
    isSubmitting.value = false
    if (submissionStatus.value === 'success') {
      setTimeout(() => { submissionStatus.value = null }, 6000)
    }
  }
}

const socials = [
  { name: 'Facebook', link: 'https://www.facebook.com/', svg: `<svg fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path></svg>` },
  { name: 'LinkedIn', link: 'https://www.linkedin.com/', svg: `<svg fill="currentColor" viewBox="0 0 24 24"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"></path><circle cx="4" cy="4" r="2"></circle></svg>` },
  { name: 'GitHub', link: 'https://github.com/paoromancer', svg: `<svg fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"></path></svg>` }
]

// ------------------------------------
// Tab & About Section Setup
// ------------------------------------

const bin1 = ref('01101110')
const bin2 = ref('01100001')
const bin3 = ref('01110100')
let binaryInterval

// Nav Active State
const activeNav = ref('Home')

// Project Filtering State
const projectCategories = ['University', 'Work', 'DIY']
const selectedProjectCategory = ref('University')

const filteredProjects = computed(() => {
  return projects.filter(p => p.category === selectedProjectCategory.value)
})

// Mobile Menu State
const isMobileMenuOpen = ref(false)
const scrollToSectionMobile = (item) => {
  isMobileMenuOpen.value = false
  setTimeout(() => {
    scrollToSection(item)
  }, 300)
}

// Project Modal State
const isProjectModalOpen = ref(false)
const selectedProject = ref(null)

const openProjectModal = (project) => {
  selectedProject.value = project
  isProjectModalOpen.value = true
}

const closeProjectModal = () => {
  isProjectModalOpen.value = false
  setTimeout(() => {
    selectedProject.value = null
  }, 300) // Delay clearing to let fade transition finish
}

// Award Modal State
const isAwardModalOpen = ref(false)
const selectedAward = ref(null)

// Hover Magnetic Cursor Effect for Award Images
const handleAwardMouseMove = (e) => {
  const container = e.currentTarget;
  const cursor = container.querySelector('.award-cursor');
  if (!cursor) return;
  
  const rect = container.getBoundingClientRect();
  const x = e.clientX - rect.left - rect.width / 2;
  const y = e.clientY - rect.top - rect.height / 2;
  
  gsap.to(cursor, {
    x: x * 0.7, // 70% magnet pull factor 
    y: y * 0.7,
    duration: 0.6,
    ease: "power3.out",
    overwrite: "auto"
  });
}

const handleAwardMouseLeave = (e) => {
  const container = e.currentTarget;
  const cursor = container.querySelector('.award-cursor');
  if (!cursor) return;
  
  gsap.to(cursor, {
    x: 0,
    y: 0,
    duration: 0.8,
    ease: "elastic.out(1, 0.4)", // Nice bounce back to center
    overwrite: "auto"
  });
}

const openAwardModal = (award) => {
  selectedAward.value = award
  isAwardModalOpen.value = true
}

const closeAwardModal = () => {
  isAwardModalOpen.value = false
  setTimeout(() => {
    selectedAward.value = null
  }, 300) 
}

// Smooth scroll to element
const scrollToSection = (item) => {
  activeNav.value = item
  const id = item.toLowerCase().replace(' ', '')
  const element = document.getElementById(id)
  const scroller = document.getElementById('main-scroll')
  if (element && scroller) {
    scroller.scrollTo({
      top: element.offsetTop,
      behavior: 'smooth'
    })
  }
}

onMounted(() => {
  // GSAP ScrollTrigger for Award Cards Stacking Effect
  if (process.client) {
    import('gsap/ScrollTrigger').then((module) => {
      const ScrollTrigger = module.ScrollTrigger || module.default.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);

      const cards = gsap.utils.toArray('.award-card');
      
      cards.forEach((card, index) => {
        if (index === cards.length - 1) return; // Skip last card

        gsap.to(card, {
          scale: 0.95,
          opacity: 0.4,
          scrollTrigger: {
            trigger: cards[index + 1],
            scroller: "#main-scroll", // Required because window is not scrolling, main is
            start: "top center+=15vh", // Start scaling down when next card reaches past center
            end: "top top+=120",       // Finish scaling exactly when next card hits its sticky top
            scrub: true,
          }
        });
      });

      // Global Fade Up Elements Animation
      const fadeElements = gsap.utils.toArray('.gsap-fade-up');
      fadeElements.forEach((el) => {
        gsap.from(el, {
          y: 60,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            scroller: "#main-scroll",
            start: "top 90%", // Trigger slightly earlier for smoother entry
            toggleActions: "play none none none", // Only play once to prevent flickering on scroll back
          }
        });
      });

      // Developer Typing Animation
      const devTitles = gsap.utils.toArray('.dev-title');
      devTitles.forEach((title) => {
        const lines = title.querySelectorAll('.dev-type-line');
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: title,
            scroller: "#main-scroll",
            start: "top 85%",
            toggleActions: "play none none none", 
          }
        });
        
        lines.forEach((line, index) => {
          const textLen = line.textContent.trim().length;
          tl.fromTo(line, 
            { width: 0 },
            {
              width: line.scrollWidth + "px",
              duration: Math.max(0.5, textLen * 0.08),
              ease: `steps(${Math.max(1, textLen)})`,
              onStart: () => line.classList.add('active-cursor'),
              onComplete: () => {
                if (index < lines.length - 1) {
                  line.classList.remove('active-cursor');
                  line.style.borderRightColor = 'transparent';
                }
              }
            }
          );
        });
      });

      // Nav Menu Active Sync
      navItems.forEach((item) => {
        const id = item.toLowerCase().replace(' ', '')
        const el = document.getElementById(id)
        if (el) {
          ScrollTrigger.create({
            trigger: el,
            scroller: "#main-scroll",
            start: "top center",   // section top passes center of viewport
            end: "bottom center", // section bottom passes center of viewport
            onToggle: self => {
              if (self.isActive) activeNav.value = item
            }
          });
        }
      });

      // Slide & Fade Left-to-Right Home Portrait (Trigger based)
      gsap.set('.portrait-main-slide', { xPercent: -50 });
      
      const portraitTl = gsap.timeline({
        scrollTrigger: {
          trigger: "#home",
          scroller: "#main-scroll",
          start: "top -5%",
          toggleActions: "play none none reverse",
        }
      });

      portraitTl.to('.portrait-main-slide', {
        xPercent: 0,
        duration: 0.9,
        ease: "expo.inOut"
      })
      .from('.portrait-main-slide img:first-child', {
        opacity: 0,
        scale: 1.1,
        duration: 0.9,
        ease: "expo.inOut"
      }, 0);



    });
  }

  // แถบ 0101 Digital Live Stream
  binaryInterval = setInterval(() => {
    // สุ่มเลขฐานสอง 8 หลัก
    const randomBin = () => Math.floor(Math.random() * 256).toString(2).padStart(8, '0')
    bin1.value = randomBin()
    bin2.value = randomBin()
    bin3.value = randomBin()
  }, 100)
})

onUnmounted(() => {
  if (binaryInterval) clearInterval(binaryInterval)
})

const activeTab = ref('About')
const tabs = ['About', 'Education', 'Skills']

const educations = [
  { 
    year: '2024 - Present', 
    university: 'King Mongkut\'s Institute of Technology Ladkrabang',
    major: 'Bachelor of Engineering Program in Computer Engineering',
    logo: '/images/KMITL_logo-BLiBFB9r.png',
    info: 'Focus on Embedded Systems, Internet of Things, and Cloud Architectures. Developing a deep understanding of hardware-software integration.' 
  },
  { 
    year: '2020 - 2023', 
    university: 'Nawamintharachinuthit Horwang Nonthaburi School',
    major: 'Science and Tech High School - Mathematics & Science Program',
    logo: '/images/HWNLogo.png', // Mockup placeholder logo
    info: 'Focus on math and science subjects. Developed strong problem-solving skills and a passion for technology.' 
  },
  {
    year: '2017 - 2019',
    university: 'Nawamintharachinuthit Horwang Nonthaburi School',
    major: 'Junior High School - Thai Program',
    logo: '/images/HWNLogo.png', // Mockup placeholder logo
    info: 'Focus on math and science subjects.'
  }
]

const skills = [
  { name: 'Vue.js / Nuxt', percent: 90 },
  { name: 'IoT / C++ (ESP32)', percent: 85 },
  { name: 'Tailwind CSS', percent: 95 },
  { name: 'Node.js / Express', percent: 80 },
  { name: 'Python / Sensors', percent: 75 },
  { name: 'Git & Deployment', percent: 85 }
]

// ------------------------------------
// Projects Data Setup
// ------------------------------------
const projects = [
  {
    title: 'Automatic Audio Gain Adjustment System Based on Real Time Crowd Density',
    category: 'University',
    description: 'Team Projects 2 - Automatic Audio Gain Adjustment System Based on Real Time Crowd Density',
    image: '/images/proj1.1.png',
    link: '/pdf/proj1.1.pdf'
  },
  {
    title: 'iote.kmitl.ac.th new website mock up',
    category: 'University',
    description: 'The IoTE Website proposes a modernized, mobile-friendly platform for KMITL’s IoT and Information Engineering department. Key features include interactive study roadmaps, internship portals, and senior review forums. Built with Nuxt.js and MySQL, it aims to boost user engagement and streamline academic management.',
    image: '/images/proj2.png',
    link: 'https://67010635.consolutechcloud.com/'
  },
  {
    title: 'PinyoPlay: Touchless Audio Control',
    category: 'University',
    description: 'The touchless voice control system uses gesture sensors to perform actions such as adjusting volume, playing/pausing, and changing tracks. Processing is done via a microprocessor and displayed on an LCD screen. Designed for the elderly, it reduces complexity, reduces risk, and increases convenience, with customizable settings.',
    image: '/images/proj3.png',
    link: '/pdf/PinyoPlay Touchless Audio Control.pdf'
  },
  {
    title: 'WattsUp: Smart Energy Monitoring System',
    category: 'University',
    description: 'The WattsUp: Smart Energy Monitoring System is a smart energy management solution designed to monitor and control household power consumption in real time. It uses an ESP32 microcontroller connected to a PZEM-004T V3.0 sensor to measure voltage, current, power, and energy consumption.',
    image: '/images/proj4.1.jpg',
    link: '/pdf/proj4.pdf'
  },
  {
    title: 'DoorKeeper: Smart Door Lock Guard',
    category: 'University',
    description: 'Monitoring | Count the number of people entering/exiting and display the results via the Dashboard in real time. Controlling | Can control the opening and closing remotely via the dashboard. Data Storage | Store the name and time of people entering/exiting in Google Sheet. Notification | Notify via Line Notify',
    image: '/images/proj5.png',
    link: '/pdf/DoorKeeper.pdf'
  },
  // Work Samples
  /*{
    title: 'Industrial IoT Dashboard',
    category: 'Work',
    description: 'Real-time monitoring system for factory production lines, tracking machine efficiency and environmental parameters using MQTT and high-performance data visualization.',
    image: '/images/proj1.1.png', // Sample placeholder
    link: '#'
  },
  {
    title: 'Asset Tracking System',
    category: 'Work',
    description: 'A cloud-based inventory management platform using RFID and BLE technology to track high-value assets across multiple locations in real-time.',
    image: '/images/proj2.png', // Sample placeholder
    link: '#'
  },
  // DIY Samples
  {
    title: 'Smart Garden Ecosystem',
    category: 'DIY',
    description: 'An automated home gardening system built with ESP32, featuring soil moisture analysis, automated irrigation, and a mobile app interface for remote control.',
    image: '/images/proj3.png', // Sample placeholder
    link: '#'
  },
  {
    title: 'Custom Macro Pad',
    category: 'DIY',
    description: 'A fully custom 3D-printed macro pad with mechanical switches and OLED display, running on QMK firmware with personalized layer configurations.',
    image: '/images/proj4.1.jpg', // Sample placeholder
    link: '#'
  } */
]

// ------------------------------------
// Awards Data Setup
// ------------------------------------
const awards = [
  {
    year: '2025',
    title: 'Won 1st Runner-up GHB Hackathon 2025.',
    organization: 'The Government Housing Bank (GHB) and Thammasat University.',
    image: '/images/award1.jpg'
  },
  {
    year: '2024',
    title: 'Join in KrungsriUniVerse x KMITL Hackathon',
    organization: 'KrungsriUniVerse x KMITL Hackathon ',
    image: '/images/award2.jpg'
  },
  {
    year: '2023',
    title: 'Join in Young Game Dev CAMT Chang Mai University',
    organization: 'Chang Mai University',
    image: '/images/award3.jpg'
  }
]
</script>

<style>
/* นำเข้าฟอนต์ Tech/Modern: Space Grotesk และ Outfit */
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap');

.font-serif {
  font-family: 'Space Grotesk', sans-serif;
}
.font-sans {
  font-family: 'Outfit', sans-serif;
}

/* -------------------------------- */
/* CSS Animations for Slide Tabs    */
/* -------------------------------- */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}
.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(25px);
}
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-25px);
}

/* Progress Bar Custom Fill Anime   */
.fill-anim {
  width: 0%;
  animation: fillBar 1.2s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
  /* Add a slight delay to allow tab slide to finish */
  animation-delay: 0.1s; 
}

@keyframes fillBar {
  to { width: var(--fill); }
}

/* -------------------------------- */
/* Background Tech Grid & Scanner   */
/* -------------------------------- */
.bg-tech-grid {
  background-size: 50px 50px;
  background-image: 
    linear-gradient(to right, rgba(255, 101, 101, 0.05) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255, 101, 101, 0.05) 1px, transparent 1px);
  mask-image: linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%);
  -webkit-mask-image: linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%);
}

/* -------------------------------- */
/* Custom Scrollbar for Main App    */
/* -------------------------------- */
main::-webkit-scrollbar {
  width: 8px;
}
main::-webkit-scrollbar-track {
  background: #050505; 
}
main::-webkit-scrollbar-thumb {
  background: #222; 
  border-radius: 10px;
}
main::-webkit-scrollbar-thumb:hover {
  background: #ff6565; 
}
/* -------------------------------- */
/* Binary CSS Variables & Anime     */
/* -------------------------------- */
.binary-col {
  animation-name: binaryFade;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  animation-direction: alternate;
}

@keyframes binaryFade {
  0% { transform: translateY(4px); opacity: 0.3; }
  100% { transform: translateY(-4px); opacity: 1; text-shadow: 0 0 5px rgba(255,101,101,0.6); }
}

.mask-edges {
  mask-image: linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%);
  -webkit-mask-image: linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%);
}

/* -------------------------------- */
/* Dev-Style Typing Keyframes       */
/* -------------------------------- */
.dev-type-line {
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  vertical-align: bottom;
  border-right: 4px solid transparent; 
  padding-right: 4px; 
}
.dev-type-line.active-cursor {
  animation: blink-caret 0.8s step-end infinite;
}
@keyframes blink-caret {
  0%, 100% { border-color: transparent }
  50% { border-color: #ff6565; }
}

/* ======================================================= */
/* ABOUT ME — REDESIGNED KEYFRAME ANIMATIONS              */
/* ======================================================= */

/* Panel entrance */
.about-me-panel {
  animation: aboutPanelIn 0.7s cubic-bezier(0.16,1,0.3,1) both;
}
@keyframes aboutPanelIn {
  from { opacity: 0; transform: translateY(30px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* Bio lines staggered slide-in */
.about-line {
  animation: aboutLineIn 0.6s cubic-bezier(0.16,1,0.3,1) both;
  animation-delay: var(--d, 0s);
}
@keyframes aboutLineIn {
  from { opacity:0; transform: translateX(-20px); }
  to   { opacity:1; transform: translateX(0); }
}

/* ---- Glitch Tag ---- */
.glitch-wrapper {
  display: inline-block;
  margin-bottom: 4px;
}
.glitch-tag {
  display: inline-block;
  font-family: 'Space Grotesk', monospace;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: #ff6565;
  position: relative;
  animation: glitchText 4s infinite;
}
.glitch-tag::before,
.glitch-tag::after {
  content: attr(data-text);
  position: absolute;
  left: 0; top: 0;
  opacity: 0.7;
}
.glitch-tag::before {
  color: #ff9e9e;
  animation: glitchBefore 4s infinite;
  clip-path: polygon(0 0, 100% 0, 100% 40%, 0 40%);
}
.glitch-tag::after {
  color: #ff3333;
  animation: glitchAfter 4s infinite;
  clip-path: polygon(0 60%, 100% 60%, 100% 100%, 0 100%);
}
@keyframes glitchText {
  0%,90%,100% { transform: translate(0); }
  92%   { transform: translate(-2px, 1px); }
  94%   { transform: translate(2px, -1px); }
  96%   { transform: translate(-1px, 2px); }
}
@keyframes glitchBefore {
  0%,90%,100% { transform: translate(0); }
  92%   { transform: translate(3px, 0); }
  94%   { transform: translate(-3px, 0); }
}
@keyframes glitchAfter {
  0%,90%,100% { transform: translate(0); }
  92%   { transform: translate(-3px, 1px); }
  94%   { transform: translate(3px, -1px); }
}

/* ---- Glowing name ---- */
.about-name-glow {
  animation: nameGlow 3s ease-in-out infinite alternate;
}
@keyframes nameGlow {
  from { text-shadow: 0 0 0px transparent; }
  to   { text-shadow: 0 0 18px rgba(255,101,101,0.35); }
}

/* ---- Scan line divider ---- */
.scan-divider {
  height: 1px;
  background: linear-gradient(to right, transparent, #ff6565, transparent);
  position: relative;
  overflow: visible;
  animation: scanPulse 2.5s ease-in-out infinite;
}
.scan-divider::after {
  content: '';
  position: absolute;
  top: -2px;
  left: 0;
  width: 40px;
  height: 5px;
  background: #ff6565;
  border-radius: 999px;
  filter: blur(3px);
  animation: scanMove 2.5s linear infinite;
}
@keyframes scanPulse {
  0%,100% { opacity: 0.3; }
  50%     { opacity: 1; }
}
@keyframes scanMove {
  from { left: 0%; }
  to   { left: 100%; }
}

/* ---- Status Badges ---- */
.status-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #9ca3af;
  border: 1px solid rgba(255,255,255,0.08);
  background: rgba(255,255,255,0.03);
  padding: 5px 12px;
  border-radius: 999px;
  animation: badgeFadeIn 0.5s ease both;
  animation-delay: 0.55s;
  transition: border-color 0.3s, color 0.3s;
}
.status-badge:hover {
  border-color: rgba(255,101,101,0.4);
  color: #ff6565;
}
.status-badge--mono { font-family: 'Space Grotesk', monospace; }
@keyframes badgeFadeIn {
  from { opacity:0; transform: scale(0.9); }
  to   { opacity:1; transform: scale(1); }
}
.status-dot {
  width: 6px; height: 6px;
  border-radius: 50%;
  background: #22c55e;
  animation: dotPulse 1.5s ease-in-out infinite;
}
.status-dot--blue { background: #60a5fa; animation: none; }
@keyframes dotPulse {
  0%,100% { box-shadow: 0 0 0 0 rgba(34,197,94,0.5); }
  50%     { box-shadow: 0 0 0 5px rgba(34,197,94,0); }
}

/* ---- Holographic Card ---- */
.holo-card {
  position: relative;
  background: linear-gradient(135deg, #131313 0%, #0f0f0f 100%);
  border: 1px solid rgba(255,101,101,0.2);
  border-radius: 2rem;
  padding: 2.5rem 2rem 2rem;
  overflow: hidden;
  animation: holoCardIn 0.8s cubic-bezier(0.16,1,0.3,1) 0.2s both;
  box-shadow: 0 0 40px rgba(255,101,101,0.06), inset 0 1px 0 rgba(255,255,255,0.05);
}
@keyframes holoCardIn {
  from { opacity:0; transform: scale(0.94) translateY(20px); }
  to   { opacity:1; transform: scale(1) translateY(0); }
}
.holo-card:hover {
  border-color: rgba(255,101,101,0.4);
  box-shadow: 0 0 60px rgba(255,101,101,0.12);
  transition: all 0.5s ease;
}

/* Shimmer sweep */
.holo-shimmer {
  position: absolute;
  inset: 0;
  background: linear-gradient(110deg,
    transparent 30%,
    rgba(255,101,101,0.04) 50%,
    transparent 70%);
  background-size: 200% 100%;
  animation: shimmerSweep 3s linear infinite;
  pointer-events: none;
  z-index: 0;
}
@keyframes shimmerSweep {
  from { background-position: -200% 0; }
  to   { background-position: 200% 0; }
}

/* Orbit rings */
.holo-orbit {
  position: absolute;
  right: -50px; top: -50px;
  width: 180px; height: 180px;
  pointer-events: none;
  z-index: 0;
}
.holo-orbit__ring {
  position: absolute;
  border-radius: 50%;
  border: 1px solid rgba(255,101,101,0.15);
}
.ring-1 { inset: 0; animation: orbitSpin 8s linear infinite; }
.ring-2 { inset: 20px; border-color: rgba(255,101,101,0.08); animation: orbitSpin 12s linear infinite reverse; }
@keyframes orbitSpin {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}
.holo-orbit__dot {
  position: absolute;
  width: 6px; height: 6px;
  border-radius: 50%;
  background: #ff6565;
  top: 50%; left: 0;
  transform: translate(-50%, -50%);
  transform-origin: 90px center;
  animation: orbitSpin 8s linear infinite;
  box-shadow: 0 0 8px rgba(255,101,101,0.8);
}

/* Card body */
.holo-card__body { position: relative; z-index: 1; }
.holo-card__icon {
  font-size: 2rem;
  margin-bottom: 12px;
  display: inline-block;
  animation: iconFloat 3s ease-in-out infinite;
}
@keyframes iconFloat {
  0%,100% { transform: translateY(0) rotate(0deg); }
  50%     { transform: translateY(-6px) rotate(5deg); }
}
.holo-card__title {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1.25rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 10px;
  letter-spacing: 0.02em;
}
.holo-card__text {
  font-size: 0.8rem;
  color: #6b7280;
  line-height: 1.7;
  margin-bottom: 24px;
}

/* Neon stat counters */
.holo-card__stats {
  display: flex;
  gap: 0;
  border-top: 1px solid rgba(255,255,255,0.06);
  padding-top: 16px;
}
.neon-stat {
  flex: 1;
  text-align: left;
}
.neon-stat--center { text-align: center; border-left: 1px solid rgba(255,255,255,0.06); border-right: 1px solid rgba(255,255,255,0.06); padding: 0 10px; }
.neon-stat__num {
  display: block;
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1.5rem;
  font-weight: 700;
  color: #ff6565;
  animation: neonFlicker 5s ease-in-out infinite;
  line-height: 1;
  margin-bottom: 4px;
}
@keyframes neonFlicker {
  0%,95%,100% { text-shadow: 0 0 8px rgba(255,101,101,0.8); }
  96%          { text-shadow: none; opacity: 0.7; }
  97%          { text-shadow: 0 0 12px rgba(255,101,101,1); opacity: 1; }
}
.neon-stat__label {
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #4b5563;
}

/* Corner brackets */
.holo-corner {
  position: absolute;
  width: 16px; height: 16px;
  border-color: rgba(255,101,101,0.4);
  border-style: solid;
  animation: cornerPulse 3s ease-in-out infinite;
}
.holo-corner--tl { top: 12px; left: 12px; border-width: 2px 0 0 2px; border-radius: 4px 0 0 0; }
.holo-corner--tr { top: 12px; right: 12px; border-width: 2px 2px 0 0; border-radius: 0 4px 0 0; animation-delay: 0.2s; }
.holo-corner--bl { bottom: 12px; left: 12px; border-width: 0 0 2px 2px; border-radius: 0 0 0 4px; animation-delay: 0.4s; }
.holo-corner--br { bottom: 12px; right: 12px; border-width: 0 2px 2px 0; border-radius: 0 0 4px 0; animation-delay: 0.6s; }
@keyframes cornerPulse {
  0%,100% { border-color: rgba(255,101,101,0.3); }
  50%     { border-color: rgba(255,101,101,0.8); }
}

/* ---- Ambient Particles ---- */
.about-particles {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
  z-index: 0;
}
.particle {
  position: absolute;
  width: calc(2px + (var(--i) * 0.5px));
  height: calc(2px + (var(--i) * 0.5px));
  border-radius: 50%;
  background: rgba(255,101,101,0.4);
  left: calc((var(--i) * 7.7%) + 2%);
  bottom: -10px;
  animation: particleFloat calc(4s + (var(--i) * 0.6s)) ease-in-out infinite;
  animation-delay: calc(var(--i) * -0.4s);
  filter: blur(1px);
}
@keyframes particleFloat {
  0%   { transform: translateY(0) scale(1); opacity: 0; }
  10%  { opacity: 0.8; }
  90%  { opacity: 0.3; }
  100% { transform: translateY(-200px) scale(0.3); opacity: 0; }
}

/* ---- Tech Ribbon Marquee ---- */
.tech-ribbon-track {
  width: 100%;
  overflow: hidden;
  border-top: 1px solid rgba(255,255,255,0.05);
  padding-top: 16px;
  mask-image: linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%);
  -webkit-mask-image: linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%);
}
.tech-ribbon {
  display: flex;
  gap: 12px;
  width: max-content;
  animation: techScroll 20s linear infinite;
}
@keyframes techScroll {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}
.tech-tag {
  display: inline-flex;
  align-items: center;
  font-family: 'Space Grotesk', monospace;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: rgba(255,101,101,0.7);
  border: 1px solid rgba(255,101,101,0.15);
  background: rgba(255,101,101,0.04);
  padding: 5px 14px;
  border-radius: 999px;
  white-space: nowrap;
  transition: all 0.3s;
}
.tech-tag:hover {
  background: rgba(255,101,101,0.12);
  color: #ff6565;
  border-color: rgba(255,101,101,0.4);
}

/* Performance optimizations for animated elements */
.gsap-fade-up {
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  perspective: 1000px;
  transform-style: preserve-3d;
}

/* -------------------------------- */
/* HOME SECTION KEYFRAMES          */
/* -------------------------------- */

.home-title-reveal span span {
  animation: revealText 1s cubic-bezier(0.77, 0, 0.175, 1) forwards;
  transform: translateY(100%);
}
.home-title-reveal span:nth-child(2) span {
  animation-delay: 0.3s;
}

@keyframes revealText {
  to { transform: translateY(0); }
}

.home-fade-in {
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInDown 0.8s ease-out forwards;
}

@keyframes fadeInDown {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.home-card-float {
  animation: floatCard 6s ease-in-out infinite;
}

@keyframes floatCard {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  25% { transform: translateY(-10px) rotate(0.5deg); }
  50% { transform: translateY(-15px) rotate(0deg); }
  75% { transform: translateY(-8px) rotate(-0.5deg); }
}

/* --- Horizontal Scanner --- */
.home-scanner {
  animation: scanLine 3.5s linear infinite;
}

@keyframes scanLine {
  0% { top: 0; opacity: 0; }
  5% { opacity: 1; }
  95% { opacity: 0.8; }
  100% { top: 100%; opacity: 0; }
}

/* --- Vertical Scanner --- */
.home-scanner-v {
  animation: scanLineV 5s linear infinite;
  animation-delay: 1.5s;
}

@keyframes scanLineV {
  0% { left: 0; opacity: 0; }
  5% { opacity: 1; }
  95% { opacity: 0.6; }
  100% { left: 100%; opacity: 0; }
}

.home-social-pop {
  opacity: 0;
  transform: scale(0.5);
  animation: popIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
}

@keyframes popIn {
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.home-btn-glow {
  animation: btnPulse 3s infinite;
}

@keyframes btnPulse {
  0%, 100% { box-shadow: 0 0 20px rgba(255, 101, 101, 0.3); }
  50% { box-shadow: 0 0 35px rgba(255, 101, 101, 0.6); }
}

.home-blob-1 {
  animation: blobMove 20s infinite alternate;
}
.home-blob-2 {
  animation: blobMove 25s infinite alternate-reverse;
}

@keyframes blobMove {
  from { transform: translate(0, 0) scale(1); }
  to { transform: translate(50px, 30px) scale(1.1); }
}

/* --- Floating Code Snippets --- */
.home-code-float {
  animation: codeAppear 1.5s ease-out 1s both;
}

@keyframes codeAppear {
  from { opacity: 0; transform: translateY(15px); }
  to { opacity: 1; transform: translateY(0); }
}

.home-code-drift {
  animation: codeDrift 8s ease-in-out infinite;
  animation-delay: var(--drift-d, 0s);
}

@keyframes codeDrift {
  0%, 100% { transform: translateY(0) translateX(0); }
  33% { transform: translateY(-8px) translateX(4px); }
  66% { transform: translateY(4px) translateX(-3px); }
}

/* --- Crosshair Decoration --- */
.home-crosshair {
  animation: crosshairPulse 4s ease-in-out infinite, crosshairSpin 12s linear infinite;
}

@keyframes crosshairPulse {
  0%, 100% { opacity: 0.3; transform: scale(1); }
  50% { opacity: 0.8; transform: scale(1.2); }
}

@keyframes crosshairSpin {
  to { transform: rotate(360deg); }
}

/* --- Profile Card Corner Brackets --- */
.home-corner {
  position: absolute;
  width: 18px;
  height: 18px;
  border-color: rgba(255,101,101,0.3);
  border-style: solid;
  z-index: 30;
  animation: homeCornerPulse 3s ease-in-out infinite;
}
.home-corner--tl { top: 8px; left: 8px; border-width: 2px 0 0 2px; border-radius: 4px 0 0 0; }
.home-corner--tr { top: 8px; right: 8px; border-width: 2px 2px 0 0; border-radius: 0 4px 0 0; animation-delay: 0.3s; }
.home-corner--bl { bottom: 8px; left: 8px; border-width: 0 0 2px 2px; border-radius: 0 0 0 4px; animation-delay: 0.6s; }
.home-corner--br { bottom: 8px; right: 8px; border-width: 0 2px 2px 0; border-radius: 0 0 4px 0; animation-delay: 0.9s; }

@keyframes homeCornerPulse {
  0%, 100% { border-color: rgba(255,101,101,0.2); }
  50% { border-color: rgba(255,101,101,0.7); }
}

/* --- Orbit Rings --- */
.home-orbit-spin {
  animation: homeOrbit 10s linear infinite;
}
.home-orbit-spin-reverse {
  animation: homeOrbit 14s linear infinite reverse;
}

@keyframes homeOrbit {
  to { transform: rotate(360deg); }
}

/* --- HUD Data Overlay --- */
.home-hud-line {
  opacity: 0;
  transform: translateX(-8px);
  animation: hudLineIn 0.5s ease-out forwards;
  animation-delay: var(--hud-d, 0s);
}

@keyframes hudLineIn {
  to { opacity: 1; transform: translateX(0); }
}

/* --- Glitch Flash on Portrait --- */
.home-glitch-flash {
  background: linear-gradient(
    180deg,
    transparent 0%,
    rgba(255,101,101,0.03) 45%,
    rgba(255,101,101,0.08) 50%,
    rgba(255,101,101,0.03) 55%,
    transparent 100%
  );
  animation: glitchFlash 6s infinite;
  mix-blend-mode: screen;
}

@keyframes glitchFlash {
  0%, 89%, 100% { opacity: 0; transform: translateY(0); }
  90% { opacity: 1; transform: translateY(-100%); }
  92% { opacity: 0.5; transform: translateY(50%); }
  94% { opacity: 0; transform: translateY(0); }
}

/* --- Profile Card Hover Glow Border --- */
.home-profile-card {
  transition: border-color 0.5s ease, box-shadow 0.5s ease;
}
.home-profile-card:hover {
  border-color: rgba(255,101,101,0.3);
  box-shadow: 0 25px 60px rgba(0,0,0,0.6), 0 0 40px rgba(255,101,101,0.08);
}

/* Ensure smooth image scaling — scoped to award cards only */
.award-card .group:hover img {
  transform: scale(1.1) translateZ(0);
}
</style>