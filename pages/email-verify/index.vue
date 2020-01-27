<template>
  <Modal @close="$nuxt.$router.replace({ path: '/' })">
    <template v-slot:header>
      Подтверждение E-Mail
    </template>
    <template v-slot:body>
      <div style="display: flex; flex-direction: column; align-items: center">
        <!--<Button
          v-if="result === ''"
          shape="semi-rounded"
          borders="outline"
          @click.native="verify"
        >
          Подтвердить email
        </Button>-->
        <h1 v-if="result === 'success'">Успешно!</h1>
        <h1 v-if="error">Ошибка!</h1>
        <span v-if="error">
          Возможно, срок действия токена истек, попробуйте подтвердить почту
          заново
        </span>
        <Button shape="semi-rounded" borders="outline" @click.native="send">
          Выслать повторно
        </Button>
      </div>
    </template>
  </Modal>
</template>

<script>
export default {
  middleware: ['auth'],
  name: 'Index',
  data() {
    return {
      token: this.$route.query.token ? this.$route.query.token : 'err',
      result: '',
      error: null
    }
  },
  created() {
    this.verify()
  },
  methods: {
    async send() {
      await this.$axios
        .$post(
          'https://admin.монтаждемонтаж.рф/api/auth/email-verification/send',
          {
            handler_url: 'https://xn--80aaledd0beefeg0ch.xn--p1ai/email-verify'
          }
        )
        .then((e) => {
          this.result = ''
          this.error = null
        })
    },
    async verify() {
      const data = { token: this.token }
      await this.$axios
        .post(
          'https://admin.xn--80aaledd0beefeg0ch.xn--p1ai/api/auth/email-verification/verify',
          data
        )
        .then((response) => {
          this.result = 'success'
        })
      /* .catch((e) => {
          this.error = e + ''
        }) */
    }
  }
}
</script>

<style scoped></style>
