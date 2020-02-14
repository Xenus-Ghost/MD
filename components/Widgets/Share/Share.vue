<template>
  <div
    :class="[
      'share__container',
      float === 'left' ? 'share__container_left' : 'share__container_right'
    ]"
  >
    <ul v-if="show || open" class="share__list">
      <li
        v-for="(item, l) in serviceList"
        :key="l"
        :class="['share__item', 'share__item_' + item.name]"
      >
        <a
          :href="`${item.url}`"
          class="share__link"
          rel="nofollow"
          target="_blank"
          :title="`Отправить в ${item.title}`"
        >
          <span :class="['share__badge', 'share__badge_' + item.name]"
            ><span :class="['share__icon', 'share__icon_' + item.name]"></span
          ></span>
          <span class="share__title">{{ item.title }}</span>
        </a>
      </li>
    </ul>
    <Button
      v-show="!open"
      :class="[
        'share__button',
        float === 'left' ? 'share__button_left' : 'share__button_right'
      ]"
      shape="rounded"
      title="Поделиться"
      @click="show = !show"
    >
      <img
        src="data:image/svg+xml,%3Csvg height='512pt' viewBox='-21 0 512 512' width='512pt' fill='white' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='m453.332031 85.332031c0 38.292969-31.039062 69.335938-69.332031 69.335938s-69.332031-31.042969-69.332031-69.335938c0-38.289062 31.039062-69.332031 69.332031-69.332031s69.332031 31.042969 69.332031 69.332031zm0 0'/%3E%3Cpath d='m384 170.667969c-47.0625 0-85.332031-38.273438-85.332031-85.335938 0-47.058593 38.269531-85.332031 85.332031-85.332031s85.332031 38.273438 85.332031 85.332031c0 47.0625-38.269531 85.335938-85.332031 85.335938zm0-138.667969c-29.417969 0-53.332031 23.9375-53.332031 53.332031 0 29.398438 23.914062 53.335938 53.332031 53.335938s53.332031-23.9375 53.332031-53.335938c0-29.394531-23.914062-53.332031-53.332031-53.332031zm0 0'/%3E%3Cpath d='m453.332031 426.667969c0 38.289062-31.039062 69.332031-69.332031 69.332031s-69.332031-31.042969-69.332031-69.332031c0-38.292969 31.039062-69.335938 69.332031-69.335938s69.332031 31.042969 69.332031 69.335938zm0 0'/%3E%3Cpath d='m384 512c-47.0625 0-85.332031-38.273438-85.332031-85.332031 0-47.0625 38.269531-85.335938 85.332031-85.335938s85.332031 38.273438 85.332031 85.335938c0 47.058593-38.269531 85.332031-85.332031 85.332031zm0-138.667969c-29.417969 0-53.332031 23.9375-53.332031 53.335938 0 29.394531 23.914062 53.332031 53.332031 53.332031s53.332031-23.9375 53.332031-53.332031c0-29.398438-23.914062-53.335938-53.332031-53.335938zm0 0'/%3E%3Cpath d='m154.667969 256c0 38.292969-31.042969 69.332031-69.335938 69.332031-38.289062 0-69.332031-31.039062-69.332031-69.332031s31.042969-69.332031 69.332031-69.332031c38.292969 0 69.335938 31.039062 69.335938 69.332031zm0 0'/%3E%3Cpath d='m85.332031 341.332031c-47.058593 0-85.332031-38.269531-85.332031-85.332031s38.273438-85.332031 85.332031-85.332031c47.0625 0 85.335938 38.269531 85.335938 85.332031s-38.273438 85.332031-85.335938 85.332031zm0-138.664062c-29.417969 0-53.332031 23.933593-53.332031 53.332031s23.914062 53.332031 53.332031 53.332031c29.421875 0 53.335938-23.933593 53.335938-53.332031s-23.914063-53.332031-53.335938-53.332031zm0 0'/%3E%3Cpath d='m135.703125 245.761719c-7.425781 0-14.636719-3.863281-18.5625-10.773438-5.824219-10.21875-2.238281-23.253906 7.980469-29.101562l197.949218-112.851563c10.21875-5.867187 23.253907-2.28125 29.101563 7.976563 5.824219 10.21875 2.238281 23.253906-7.980469 29.101562l-197.953125 112.851563c-3.328125 1.898437-6.953125 2.796875-10.535156 2.796875zm0 0'/%3E%3Cpath d='m333.632812 421.761719c-3.585937 0-7.210937-.898438-10.539062-2.796875l-197.953125-112.851563c-10.21875-5.824219-13.800781-18.859375-7.976563-29.101562 5.800782-10.238281 18.855469-13.84375 29.097657-7.976563l197.953125 112.851563c10.21875 5.824219 13.800781 18.859375 7.976562 29.101562-3.945312 6.910157-11.15625 10.773438-18.558594 10.773438zm0 0'/%3E%3C/svg%3E"
        class="share__icon share__icon_button"
        alt="Поделиться"
      />
    </Button>
  </div>
</template>

<script>
export default {
  name: 'Share',
  props: {
    link: {
      type: String,
      default: process.client ? window.location.href : '/'
    },
    services: {
      type: String,
      default:
        'telegram, vkontakte, odnoklassniki, facebook, viber, whatsapp, skype'
    },
    float: {
      type: String,
      default: 'left'
    },
    open: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      servicesTemplates: {
        telegram: {
          title: 'Telegram',
          templateUrl: 'tg://msg_url?url='
        },
        vkontakte: {
          title: 'Вконтакте',
          templateUrl: 'https://vk.com/share.php?url='
        },
        odnoklassniki: {
          title: 'Одноклассники',
          templateUrl: 'https://connect.ok.ru/offer?url='
        },
        facebook: {
          title: 'facebook',
          templateUrl: 'https://www.facebook.com/sharer.php?src=sp&u='
        },
        viber: {
          title: 'Viber',
          templateUrl: 'viber://forward?text='
        },
        whatsapp: {
          title: 'WhatsApp',
          templateUrl: 'https://api.whatsapp.com/send?text='
        },
        yandexCollections: {
          title: 'Яндекс Коллекции',
          templateUrl: 'https://yandex.ru/collections/share/?url='
        },
        twitter: {
          title: 'Twitter',
          templateUrl: 'https://twitter.com/intent/tweet?text=&url='
        },
        skype: {
          title: 'Skype',
          templateUrl: 'https://web.skype.com/share?url='
        }
      },
      show: false
    }
  },
  computed: {
    serviceList() {
      const serviceArray = this.services.split(', ')
      const result = []
      serviceArray.forEach((item) => {
        result.push({
          name: item,
          url: this.servicesTemplates[item].templateUrl + this.link,
          title: this.servicesTemplates[item].title
        })
      })
      return result
    }
  }
}
</script>

<style lang="scss">
@import 'share';
</style>
