<template>
  <client-only>
    <aside class="profile-widget">
      <Button
        class="button_profile-enter"
        @click.prevent.native="profileButtonClick"
      >
        Личный кабинет
      </Button>
      <ul class="socials__list">
        <li class="socials__item">
          <a
            href="https://vk.com/share.php?url=https://монтаждемонтаж.рф"
            target="_blank"
            title="Вконтакте"
          >
            <img src="~assets/img/social/vk.svg" alt="" />
          </a>
        </li>
        <li class="socials__item">
          <a
            href="https://www.facebook.com/sharer.php?u=https://монтаждемонтаж.рф"
            target="_blank"
            title="Facebook"
          >
            <img src="~assets/img/social/fb.svg" alt="" />
          </a>
        </li>
        <li class="socials__item">
          <a
            href="https://connect.ok.ru/offer?url=https://монтаждемонтаж.рф&title=https://монтаждемонтаж.рф"
            target="_blank"
            title="Одноклассники"
          >
            <img src="~assets/img/social/ok.svg" alt="" />
          </a>
        </li>
        <li class="socials__item">
          <a
            href="https://twitter.com/share?url=https://монтаждемонтаж.рф&text=МонтажДемонтаж&via=[via]&hashtags=[hashtags]"
            target="_blank"
            title="Twitter"
          >
            <img src="~assets/img/social/tw.svg" alt="" />
          </a>
        </li>
      </ul>
    </aside>
  </client-only>
</template>
<script>
export default {
  name: 'ProfileWidget',
  methods: {
    authFormOpen() {
      this.$store.commit('authFormOpen')
    },
    profileButtonClick() {
      if (this.$store.state.auth.loggedIn) {
        this.$router.push('/lk')
      } else {
        this.authFormOpen()
      }
    }
  }
}
</script>
<style scoped lang="scss">
@import '~assets/scss/app/index.scss';
.profile-widget {
  --button-width: 40px;
  @include media_screen(desktop-wide) {
    --button-width: 70px;
  }
  position: fixed;
  top: 150px;
  right: 0;
  display: none;
  grid-gap: 10px;
  grid-template-rows: minmax(220px, 1fr) minmax(180px, 1fr);
  width: var(--button-width);
  @include media_screen(tablet) {
    display: grid;
  }
  @include media_screen(desktop-wide) {
    grid-template-rows: minmax(320px, 1fr) minmax(180px, 1fr);
  }
}
.button_profile-enter {
  background: #4bae4f;

  width: 220px;
  height: var(--button-width);
  transform-origin: left top;
  transform: rotate(90deg) translateY(-100%);
  transition: transform 0.2s ease;
  font-size: 1.2rem;
  color: white;
  font-weight: normal;
  border-bottom-left-radius: 1rem;
  border-bottom-right-radius: 1rem;
  box-shadow: none;
  @include media_screen(desktop-wide) {
    width: 320px;
    font-size: 1.875rem;
    border-bottom-left-radius: 2rem;
    border-bottom-right-radius: 2rem;
  }
}
.socials {
  &__list {
    list-style: none;
    padding: 5px;
    display: flex;
    flex-direction: column;
    align-content: center;
    width: var(--button-width);
  }
  &__item {
    display: block;
    margin: 15px auto 0 auto;
  }
}
</style>
