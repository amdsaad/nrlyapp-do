<template>
  <div class="homepage">
    <div class="video-modal" id="vModal">
      <div class="video-modal__warper">
        <div class="close-video" @click="vurl = null">&#x2715;</div>
        <img :src="logoUrl" alt="app logo" class="logo-modal__wraper-logo" />
        <video src="" controls></video>
      </div>
    </div>
    <div class="logo-modal">
      <div class="logo-modal__wraper">
        <button class="contacts-a" id="closeLogoModal">
          <div class="contacts-a__action">
            <div class="name">↙</div>
            <div class="hoverText">close</div>
          </div>
        </button>
        <img :src="logoUrl" alt="app logo" class="logo-modal__wraper-logo" />
        <div class="logo-modal__wraper-text">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Consequuntur, iusto.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Consequuntur, iusto.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Consequuntur, iusto.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Consequuntur, iusto.
          </p>
        </div>
      </div>
    </div>
    <div class="info-modal" :class="{ 'show-info-moda': showinfo }">
      <div class="info-modal-content">
        <div class="close-info pointer" @click="closeInfo">&#x2715;</div>
        <nuxt-content :document="infoModal" />
      </div>
    </div>
    <div id="smooth-wrapper">
      <div id="smooth-content">
        <div id="scroll_container_trigger">
          <div class="scroll_container">
            <div class="inner_wrapper" v-for="i in 2" :key="i">
              <div class="scenes s-5">
                <div
                  class="scenes_wraper"
                  v-for="(im, ind) of scene5"
                  :key="ind"
                >
                  <img alt="" :src="im.url" class="scene-image" />
                </div>
              </div>
              <div class="scenes s-4">
                <div
                  class="scenes_wraper"
                  v-for="(im, ind) of scene4"
                  :key="ind"
                >
                  <img alt="" :src="im.url" class="scene-image" />
                </div>
              </div>
              <div class="scenes s-3" id="videos">
                <div
                  class="scenes_wraper"
                  v-for="(im, ind) of vImages"
                  :key="ind"
                >
                  <div v-if="im.v_url" class="s-3__video__wraper">
                    <div class="s-3__video__wraper__text">
                      <p class="v-title">{{ im.title }}</p>
                      <button
                        class="mb-4 pointer showPlayVideo"
                        :data-video-url="im.v_url"
                      >
                        Play
                      </button>
                      <button
                        :data-video-info="im.info"
                        class="pointer showInfoVideo"
                      >
                        Info
                      </button>
                    </div>
                    <img
                      v-if="im.v_url"
                      alt=""
                      :src="im.v_image_url"
                      class="scene-v"
                      @click="vurl = im.v_url"
                    />
                    <!-- <video
                      :src="im.v_url"
                      preload="auto"
                      muted
                      loop
                    ></video> -->
                  </div>
                  <img
                    v-if="!im.v_url"
                    alt=""
                    :src="im.url"
                    class="scene-image logo"
                  />
                </div>
                <!-- <div
                  class="scenes_wraper"
                  v-for="(im, ind) of scene5"
                  :key="ind"
                >
                  <img alt="" :src="im.url" class="scene-image" />
                </div> -->
              </div>
              <div class="scenes s-2">
                <div
                  class="scenes_wraper"
                  v-for="(im, ind) of scene2"
                  :key="ind"
                >
                  <img alt="" :src="im.url" class="scene-image" />
                </div>
              </div>
              <div class="scenes s-1">
                <div
                  class="scenes_wraper"
                  v-for="(im, ind) of scene1"
                  :key="ind"
                >
                  <img alt="" :src="im.url" class="scene-image" />
                </div>
              </div>
            </div>
          </div>
          <div class="bottom"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      vurl: null,
      logoUrl:
        'https://res.cloudinary.com/toravl/image/upload/v1666430721/nrlyapp/scene3/logo.png',

      vImages: [
        {
          url: null,
          v_image_url:
            'https://res.cloudinary.com/toravl/image/upload/v1668930992/nrlyapp/medical.png',
          // v_url:
          //   'https://res.cloudinary.com/toravl/video/upload/v1666402921/nrlyapp/videos/v1.mp4',
          v_url: '/videos/v_1.mp4',
          info: 'medical',
          title: 'medical',
        },
        {
          url: null,
          v_image_url:
            'https://res.cloudinary.com/toravl/image/upload/v1668930982/nrlyapp/hotel.png',

          v_url: '/videos/v_2.mp4',
          info: 'hotelBooking',
          title: 'hotel booking',
          // v_url:
          //   'https://res.cloudinary.com/toravl/video/upload/v1666402768/nrlyapp/videos/v2.mp4',
        },
        {
          url: null,
          v_image_url:
            'https://res.cloudinary.com/toravl/image/upload/v1668930965/nrlyapp/concierge.png',

          v_url: '/videos/v_3.mp4',
          info: 'conciergeServices',
          title: 'concierge services',
          // v_url:
          //   'https://res.cloudinary.com/toravl/video/upload/v1666402768/nrlyapp/videos/v3.mp4',
        },
        {
          url: null,
          v_image_url:
            'https://res.cloudinary.com/toravl/image/upload/v1668930976/nrlyapp/business.png',

          v_url: '/videos/v_4.mp4',
          info: 'consulting',
          title: 'consulting',

          // v_url:
          //   'https://res.cloudinary.com/toravl/video/upload/v1666402768/nrlyapp/videos/v4.mp4',
        },
        {
          v_url: null,
          url: 'https://res.cloudinary.com/toravl/image/upload/v1666430721/nrlyapp/scene3/logo.png',
        },
      ],
      scene2: [
        {
          url: 'https://res.cloudinary.com/toravl/image/upload/v1666401581/nrlyapp/scene2/5.jpg',
        },
        {
          url: 'https://res.cloudinary.com/toravl/image/upload/v1666401581/nrlyapp/scene2/6.jpg',
        },
        {
          url: 'https://res.cloudinary.com/toravl/image/upload/v1666401581/nrlyapp/scene2/7.jpg',
        },
        {
          url: 'https://res.cloudinary.com/toravl/image/upload/v1666401581/nrlyapp/scene2/8.jpg',
        },
        {
          url: 'https://res.cloudinary.com/toravl/image/upload/v1666401581/nrlyapp/scene2/9.jpg',
        },
      ],
      scene4: [
        {
          url: 'https://res.cloudinary.com/toravl/image/upload/v1666401655/nrlyapp/scene4/10.jpg',
        },
        {
          url: 'https://res.cloudinary.com/toravl/image/upload/v1666401655/nrlyapp/scene4/11.jpg',
        },
        {
          url: 'https://res.cloudinary.com/toravl/image/upload/v1666401655/nrlyapp/scene4/12.jpg',
        },
        {
          url: 'https://res.cloudinary.com/toravl/image/upload/v1666401655/nrlyapp/scene4/13.jpg',
        },
        {
          url: 'https://res.cloudinary.com/toravl/image/upload/v1666401655/nrlyapp/scene4/14.jpg',
        },
      ],
      scene1: [
        {
          url: 'https://res.cloudinary.com/toravl/image/upload/v1666401570/nrlyapp/scene1/15.jpg',
        },
        {
          url: 'https://res.cloudinary.com/toravl/image/upload/v1666401570/nrlyapp/scene1/16.jpg',
        },
        {
          url: 'https://res.cloudinary.com/toravl/image/upload/v1666401570/nrlyapp/scene1/17.jpg',
        },
        {
          url: 'https://res.cloudinary.com/toravl/image/upload/v1666401570/nrlyapp/scene1/18.jpg',
        },
        {
          url: 'https://res.cloudinary.com/toravl/image/upload/v1666401570/nrlyapp/scene1/19.jpg',
        },
      ],
      scene5: [
        {
          url: 'https://res.cloudinary.com/toravl/image/upload/v1666401658/nrlyapp/scene5/20.jpg',
        },
        {
          url: 'https://res.cloudinary.com/toravl/image/upload/v1666401658/nrlyapp/scene5/21.jpg',
        },
        {
          url: 'https://res.cloudinary.com/toravl/image/upload/v1666401658/nrlyapp/scene5/22.jpg',
        },
        {
          url: 'https://res.cloudinary.com/toravl/image/upload/v1666401658/nrlyapp/scene5/23.jpg',
        },
        {
          url: 'https://res.cloudinary.com/toravl/image/upload/v1666401658/nrlyapp/scene5/24.jpg',
        },
      ],
    }
  },
  async mounted() {
    // this.medical = await this.$content('medical').fetch()
    // this.conciergeServices = await this.$content('conciergeServices').fetch()
    // this.consulting = await this.$content('consulting').fetch()
    // this.hotelBooking = await this.$content('hotelBooking').fetch()
  },
  computed: {
    infoModal() {
      return this.$store.state.activeInfo
    },
    showinfo() {
      return this.$store.state.showinfo
    },
  },
  methods: {
    closeInfo() {
      this.$store.commit('set_showinfo', false)
    },
  },
}
</script>

<style>
</style>