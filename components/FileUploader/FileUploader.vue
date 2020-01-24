<template>
  <!--<upload-image
    is="upload-image"
    url="https://admin.монтаждемонтаж.рф/api/files"
    :max_files="5"
    name="files[]"
    :resize_enabled="true"
    :resize_max_width="640"
    button_html="Загрузить"
    :button_class="'button is-primary'"
    @upload-image-attemp="uploadImageAttempt"
    @upload-image-success="uploadImageSuccess"
    @upload-image-failure="uploadImageFailure"
    @upload-image-loaded="uploadImageLoaded"
    @upload-image-submit="uploadImageSubmit"
    @upload-image-clicked="uploadImageClicked"
    @upload-image-removed="uploadImageRemoved"
  ></upload-image>-->
  <div class="uploader"></div>
</template>

<script>
// import UploadImage from 'vue-upload-image'
export default {
  name: 'FileUploader',
  components: {
    // UploadImage
  }
}
</script>

<style scoped></style>
