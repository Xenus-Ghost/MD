import Vue from 'Vue'
// import CoolLightBox from 'vue-cool-lightbox'
/* // import CoolLightBox from 'VueCoolLightBox'

// Vue.use(CoolLightBox)
Vue.component('CoolLightBox', CoolLightBox, { name: CoolLightBox })
console.log(Vue) */

/*eslint-disable */
const CoolLightBox = (function(t) {
  'use strict'
  function o(t, o, i, e, l, s, n, h, a, r) {
    typeof n !== 'boolean' && ((a = h), (h = n), (n = !1))
    const c = typeof i === 'function' ? i.options : i
    t &&
      t.render &&
      ((c.render = t.render),
      (c.staticRenderFns = t.staticRenderFns),
      (c._compiled = !0),
      l && (c.functional = !0)),
      e && (c._scopeId = e)
    let g
    if (
      (s
        ? ((g = function(t) {
            ;(t =
              t ||
              (this.$vnode && this.$vnode.ssrContext) ||
              (this.parent &&
                this.parent.$vnode &&
                this.parent.$vnode.ssrContext)) ||
              typeof __VUE_SSR_CONTEXT__ === 'undefined' ||
              (t = __VUE_SSR_CONTEXT__),
              o && o.call(this, a(t)),
              t && t._registeredComponents && t._registeredComponents.add(s)
          }),
          (c._ssrRegister = g))
        : o &&
          (g = n
            ? function() {
                o.call(this, r(this.$root.$options.shadowRoot))
              }
            : function(t) {
                o.call(this, h(t))
              }),
      g)
    )
      if (c.functional) {
        const b = c.render
        c.render = function(t, o) {
          return g.call(o), b(t, o)
        }
      } else {
        const d = c.beforeCreate
        c.beforeCreate = d ? [].concat(d, g) : [g]
      }
    return i
  }
  function i(t) {
    return function(t, o) {
      return e(t, o)
    }
  }
  function e(t, o) {
    const i = h ? o.media || 'default' : t
    const e = r[i] || (r[i] = { ids: new Set(), styles: [] })
    if (!e.ids.has(t)) {
      e.ids.add(t)
      let l = o.source
      if (
        (o.map &&
          ((l += '\n/*# sourceURL=' + o.map.sources[0] + ' */'),
          (l +=
            '\n/*# sourceMappingURL=data:application/json;base64,' +
            btoa(unescape(encodeURIComponent(JSON.stringify(o.map)))) +
            ' */')),
        e.element ||
          ((e.element = document.createElement('style')),
          (e.element.type = 'text/css'),
          o.media && e.element.setAttribute('media', o.media),
          a.appendChild(e.element)),
        'styleSheet' in e.element)
      )
        e.styles.push(l),
          (e.element.styleSheet.cssText = e.styles.filter(Boolean).join('\n'))
      else {
        const s = e.ids.size - 1
        const n = document.createTextNode(l)
        const c = e.element.childNodes
        c[s] && e.element.removeChild(c[s]),
          c.length ? e.element.insertBefore(n, c[s]) : e.element.appendChild(n)
      }
    }
  }
  function l(t) {
    l.installed || ((l.installed = !0), t.component('CoolLightBox', c))
  }
  const s = {
    data() {
      return {
        imgIndex: this.index,
        isVisible: !1,
        paddingBottom: !1,
        imageLoading: !1,
        showThumbs: !1,
        aspectRatioVideo: { width: 'auto', height: 'auto' },
        buttonsVisible: !0,
        scale: 1,
        top: 0,
        left: 0,
        lastX: 0,
        lastY: 0,
        isDraging: !1,
        canZoom: !1,
        isZooming: !1,
        transition: 'all .3s ease',
        isPlayingSlideShow: !1,
        intervalProgress: null,
        stylesInterval: { display: 'block' }
      }
    },
    props: {
      index: { required: !0 },
      items: { type: Array, required: !0 },
      loop: { type: Boolean, default: !0 },
      slideshow: { type: Boolean, default: !0 },
      slideshowColorBar: { type: String, default: '#fa4242' },
      slideshowDuration: { type: Number, default: 3e3 },
      srcName: { type: String, default: 'src' },
      srcThumb: { type: String, default: 'thumb' },
      overlayColor: { type: String, default: 'rgba(30, 30, 30, .9)' }
    },
    watch: {
      index(t, o) {
        const i = this
        t !== null
          ? ((this.imgIndex = t),
            (this.isVisible = !0),
            window.addEventListener('keydown', this.eventListener),
            window.innerWidth < 700 &&
              setTimeout(function() {
                window.addEventListener('click', i.showButtons)
              }, 200),
            (document.getElementsByTagName('body')[0].style =
              'overflow: hidden'))
          : ((this.isVisible = !1),
            this.stopSlideShow(),
            window.removeEventListener('keydown', this.eventListener),
            (document.getElementsByTagName('body')[0].style.overflow = ''),
            window.removeEventListener('click', this.showButtons))
      },
      imgIndex(t, o) {
        const i = this
        ;(this.imgIndex = t),
          this.$nextTick(function() {
            t !== null &&
              (i.videoUrl || (i.imageLoading = !0),
              i.addCaptionPadding(),
              i.checkZoom()),
              i.resetZoom(),
              i.videoUrl && i.setAspectRatioVideo()
          })
      }
    },
    mounted() {},
    destroyed() {},
    methods: {
      itemThumb(t, o) {
        const i = this.getItemThumb(o)
        if (i) return i
        const e = this.getYoutubeID(t)
        return e
          ? 'https://img.youtube.com/vi/' + e + '/mqdefault.jpg'
          : !this.getVimeoID(t) && t
      },
      getItemSrc(t) {
        if (t === null) return !1
        const o = this.items[t]
        return this.checkIfIsObject(t) ? o[this.srcName] : o
      },
      getItemThumb(t) {
        if (t === null) return !1
        const o = this.items[t]
        return this.checkIfIsObject(t)
          ? o[this.srcThumb]
          : !this.isVideo(o) && o
      },
      togglePlaySlideshow() {
        return (
          !!this.slideshow &&
          !(!this.hasNext && !this.loop) &&
          ((this.isPlayingSlideShow = !this.isPlayingSlideShow),
          void (this.isPlayingSlideShow ? this.move() : this.stopSlideShow()))
        )
      },
      stopSlideShow() {
        ;(this.isPlayingSlideShow = !1),
          clearInterval(this.intervalProgress),
          (this.stylesInterval = {
            transform: 'scaleX(0)',
            transition: 'none'
          })
      },
      move() {
        function t() {
          ;(o.stylesInterval = {
            transform: 'scaleX(0)',
            transition: 'none'
          }),
            o.onNextClick(!0),
            o.hasNext || o.loop
              ? setTimeout(function() {
                  o.stylesInterval = {
                    transform: 'scaleX(1)',
                    background: o.slideshowColorBar,
                    'transition-duration': o.slideshowDuration + 'ms'
                  }
                }, 50)
              : o.stopSlideShow()
        }
        var o = this
        ;(this.progressWidth = 100),
          (this.intervalProgress = setInterval(t, this.slideshowDuration + 90)),
          (o.stylesInterval = {
            transform: 'scaleX(1)',
            background: this.slideshowColorBar,
            'transition-duration': this.slideshowDuration + 'ms'
          })
      },
      showButtons(t) {
        if (
          !t.target.matches(
            '.cool-lightbox-button, .cool-lightbox-button *, .cool-lightbox-toolbar__btn, .cool-lightbox-toolbar__btn *'
          )
        ) {
          const o = this
          setTimeout(function() {
            o.buttonsVisible = !o.buttonsVisible
          }, 100)
        }
      },
      checkMouseEventPropButton(t) {
        return !!this.isZooming && t === 0
      },
      handleMouseDown(t) {
        this.checkMouseEventPropButton(t.button) &&
          ((this.lastX = t.clientX),
          (this.lastY = t.clientY),
          (this.isDraging = !0),
          t.stopPropagation())
      },
      handleMouseUp(t) {
        if (this.checkMouseEventPropButton(t.button)) {
          ;(this.isDraging = !1), (this.lastX = this.lastY = 0)
          const o = this
          setTimeout(function() {
            o.canZoom = !0
          }, 100)
        }
      },
      handleMouseMove(t) {
        this.checkMouseEventPropButton(t.button) &&
          (this.isDraging &&
            ((this.top = this.top - this.lastY + t.clientY),
            (this.left = this.left - this.lastX + t.clientX),
            (this.lastX = t.clientX),
            (this.lastY = t.clientY),
            (this.canZoom = !1)),
          t.stopPropagation())
      },
      zoomImage() {
        if (window.innerWidth < 700) return !1
        if (!this.canZoom) return !1
        const t = this
        this.isZooming
          ? this.isDraging || (this.isZooming = !1)
          : (this.isZooming = !0),
          this.isZooming
            ? (this.stopSlideShow(),
              (this.scale = 1.6),
              (this.buttonsVisible = !1),
              setTimeout(function() {
                t.transition = 'all .0s ease'
              }, 100))
            : ((this.buttonsVisible = !0), this.resetZoom())
      },
      resetZoom() {
        ;(this.scale = 1),
          (this.left = 0),
          (this.top = 0),
          (this.canZoom = !1),
          (this.isZooming = !1),
          (this.transition = 'all .3s ease'),
          window.innerWidth >= 700 && (this.buttonsVisible = !0)
      },
      checkZoom() {
        const t = this
        if (this.videoUrl) return (this.canZoom = !1)
        const o = new Image()
        o.src = this.itemSrc
        const i = document.getElementsByClassName('cool-lightbox')
        const e = (getComputedStyle(i[0]), i[0].clientHeight)
        o.onload = function() {
          const o = this.width
          const i = this.height
          i > e
            ? ((t.canZoom = !0),
              (t.imgFullSize = { height: i + 'px', width: o + 'px' }))
            : (t.canZoom = !1)
        }
      },
      setAspectRatioVideo() {
        const t = this
        const o = document.getElementsByClassName('cool-lightbox__slide')
        if (window.innerWidth < 700) {
          const i = o[0].clientWidth
          const e = Math.round((i / 16) * 9)
          ;(this.aspectRatioVideo.height = e + 'px'),
            (this.aspectRatioVideo.width = i + 'px')
        } else
          setTimeout(function() {
            const i = o[0].clientHeight
            const e = (i / 9) * 16
            ;(t.aspectRatioVideo.height = i + 'px'),
              (t.aspectRatioVideo.width = e + 'px')
          }, 150)
      },
      close() {
        ;(this.imgIndex = null), this.stopSlideShow(), this.$emit('close')
      },
      closeModal(t) {
        if (window.innerWidth < 700) return !1
        t.target.matches(
          '.cool-lightbox-thumbs, .cool-lightbox-thumbs *, .cool-lightbox-button, .cool-lightbox-toolbar__btn, .cool-lightbox-toolbar__btn *, .cool-lightbox-button *, .cool-lightbox__slide__img *, .cool-lightbox-video'
        ) || ((this.imgIndex = null), this.$emit('close'))
      },
      onNextClick(t) {
        void 0 === t && (t = !1),
          t || this.stopSlideShow(),
          this.hasNext
            ? this.onIndexChange(this.imgIndex + 1)
            : this.loop && this.onIndexChange(0)
      },
      onPrevClick() {
        this.stopSlideShow(),
          this.hasPrevious
            ? this.onIndexChange(this.imgIndex - 1)
            : this.loop && this.onIndexChange(this.items.length - 1)
      },
      onIndexChange(t) {
        ;(this.imgIndex = t), this.$emit('on-change', t)
      },
      addCaptionPadding() {
        if (
          this.isObject &&
          (this.items[this.imgIndex].title ||
            this.items[this.imgIndex].descripcion)
        ) {
          const t = document.getElementsByClassName('cool-lightbox-caption')
          t.length > 0 && (this.paddingBottom = t[0].offsetHeight)
        } else this.paddingBottom = 60
      },
      isVideo(t) {
        return !!(
          this.getYoutubeUrl(t) ||
          this.getVimeoUrl(t) ||
          this.checkIsMp4(t)
        )
      },
      getYoutubeID(t) {
        const o =
          !!t.match(
            /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/
          ) && RegExp.$1
        return o || !1
      },
      getYoutubeUrl(t) {
        const o =
          !!t.match(
            /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/
          ) && RegExp.$1
        return !!o && 'https://www.youtube.com/embed/' + o
      },
      getVimeoID(t) {
        const o = t.match(
          /(?:www\.|player\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/(?:[^\/]*)\/videos\/|album\/(?:\d+)\/video\/|video\/|)(\d+)(?:[a-zA-Z0-9_\-]+)?/i
        )
        return o !== null && o[1]
      },
      getVimeoUrl(t) {
        const o = t.match(
          /(?:www\.|player\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/(?:[^\/]*)\/videos\/|album\/(?:\d+)\/video\/|video\/|)(\d+)(?:[a-zA-Z0-9_\-]+)?/i
        )
        return (
          o !== null &&
          '//player.vimeo.com/video/' +
            o[1] +
            '?hd=1&show_title=1&show_byline=1&show_portrait=0&fullscreen=1'
        )
      },
      checkIsMp4(t) {
        return this.imgIndex !== null && !!new String(t).endsWith('.mp4') && t
      },
      checkIfIsObject(t) {
        const o = this.items[t]
        return typeof o === 'object' && o !== null
      },
      eventListener(t) {
        switch (t.keyCode) {
          case 39:
            return this.onNextClick()
          case 37:
            return this.onPrevClick()
          case 38:
          case 40:
          case ' ':
            return t.preventDefault()
          case 27:
            return this.close()
        }
      }
    },
    computed: {
      lightboxStyles() {
        return { 'background-color': this.overlayColor }
      },
      innerStyles() {
        return { 'padding-bottom': this.paddingBottom + 'px' }
      },
      itemSrc() {
        if (this.imgIndex === null) return !1
        const t = this.items[this.imgIndex]
        return this.isObject ? t[this.srcName] : t
      },
      isObject() {
        const t = this.items[this.imgIndex]
        return typeof t === 'object' && t !== null
      },
      videoUrl() {
        if (this.imgIndex === null) return !1
        let t
        const o = this.itemSrc
        return (t = this.getYoutubeUrl(o))
          ? t
          : (t = this.getVimeoUrl(o)) || (!!this.isMp4 && o)
      },
      isMp4() {
        if (this.imgIndex === null) return !1
        const t = this.itemSrc
        return !!new String(t).endsWith('.mp4') && t
      },
      lightboxClasses() {
        return {
          'cool-lightbox--can-zoom': this.canZoom,
          'cool-lightbox--is-zooming': this.isZooming,
          'cool-lightbox--show-thumbs': this.showThumbs
        }
      },
      buttonsClasses() {
        return { hidden: !this.buttonsVisible }
      },
      hasNext() {
        return this.imgIndex + 1 < this.items.length
      },
      hasPrevious() {
        return this.imgIndex - 1 >= 0
      },
      imgWrapperStyle() {
        return {
          transform:
            'translate3d(calc(-50% + ' +
            this.left +
            'px), calc(-50% + ' +
            this.top +
            'px), 0px) scale3d(' +
            this.scale +
            ', ' +
            this.scale +
            ', ' +
            this.scale +
            ')',
          top: '50%',
          left: '50%',
          transition: this.transition
        }
      }
    }
  }
  const n = o
  var h =
    typeof navigator !== 'undefined' &&
    /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase())
  var a = document.head || document.getElementsByTagName('head')[0]
  var r = {}
  var c = n(
    {
      render() {
        const t = this
        const o = t.$createElement
        const i = t._self._c || o
        return i('transition', { attrs: { name: 'cool-lightbox-modal' } }, [
          t.isVisible
            ? i(
                'div',
                {
                  staticClass: 'cool-lightbox',
                  class: t.lightboxClasses,
                  style: t.lightboxStyles,
                  on: { click: t.closeModal }
                },
                [
                  i('div', { staticClass: 'cool-lightbox-thumbs' }, [
                    i(
                      'div',
                      { staticClass: 'cool-lightbox-thumbs__list' },
                      t._l(t.items, function(o, e) {
                        return i(
                          'button',
                          {
                            key: e,
                            staticClass: 'cool-lightbox__thumb',
                            class: {
                              active: e === t.imgIndex,
                              'is-video': t.isVideo(t.getItemSrc(e))
                            },
                            on: {
                              click(o) {
                                t.imgIndex = e
                              }
                            }
                          },
                          [
                            t.isVideo(t.getItemSrc(e))
                              ? i(
                                  'svg',
                                  {
                                    staticClass: 'cool-lightbox__thumb__icon',
                                    attrs: {
                                      xmlns: 'http://www.w3.org/2000/svg',
                                      viewBox: '0 0 24 24'
                                    }
                                  },
                                  [
                                    i('path', {
                                      attrs: { d: 'M6.5 5.4v13.2l11-6.6z' }
                                    })
                                  ]
                                )
                              : t._e(),
                            t._v(' '),
                            i('img', {
                              attrs: {
                                src: t.itemThumb(t.getItemSrc(e), e),
                                alt: ''
                              }
                            })
                          ]
                        )
                      }),
                      0
                    )
                  ]),
                  t._v(' '),
                  i(
                    'div',
                    {
                      staticClass: 'cool-lightbox__inner',
                      style: t.innerStyles
                    },
                    [
                      i('div', {
                        staticClass: 'cool-lightbox__progressbar',
                        style: t.stylesInterval
                      }),
                      t._v(' '),
                      i('div', { staticClass: 'cool-lightbox__navigation' }, [
                        i(
                          'button',
                          {
                            directives: [
                              {
                                name: 'show',
                                rawName: 'v-show',
                                value: t.hasPrevious || t.loop,
                                expression: 'hasPrevious || loop'
                              }
                            ],
                            staticClass:
                              'cool-lightbox-button cool-lightbox-button--prev',
                            class: t.buttonsClasses,
                            on: { click: t.onPrevClick }
                          },
                          [
                            t._t('icon-previous', [
                              i(
                                'div',
                                { staticClass: 'cool-lightbox-button__icon' },
                                [
                                  i(
                                    'svg',
                                    {
                                      attrs: {
                                        xmlns: 'http://www.w3.org/2000/svg',
                                        viewBox: '0 0 24 24'
                                      }
                                    },
                                    [
                                      i('path', {
                                        attrs: {
                                          d:
                                            'M11.28 15.7l-1.34 1.37L5 12l4.94-5.07 1.34 1.38-2.68 2.72H19v1.94H8.6z'
                                        }
                                      })
                                    ]
                                  )
                                ]
                              )
                            ])
                          ],
                          2
                        ),
                        t._v(' '),
                        i(
                          'button',
                          {
                            directives: [
                              {
                                name: 'show',
                                rawName: 'v-show',
                                value: t.hasNext || t.loop,
                                expression: 'hasNext || loop'
                              }
                            ],
                            staticClass:
                              'cool-lightbox-button cool-lightbox-button--next',
                            class: t.buttonsClasses,
                            on: {
                              click(o) {
                                return t.onNextClick(!1)
                              }
                            }
                          },
                          [
                            t._t('icon-next', [
                              i(
                                'div',
                                { staticClass: 'cool-lightbox-button__icon' },
                                [
                                  i(
                                    'svg',
                                    {
                                      attrs: {
                                        xmlns: 'http://www.w3.org/2000/svg',
                                        viewBox: '0 0 24 24'
                                      }
                                    },
                                    [
                                      i('path', {
                                        attrs: {
                                          d:
                                            'M15.4 12.97l-2.68 2.72 1.34 1.38L19 12l-4.94-5.07-1.34 1.38 2.68 2.72H5v1.94z'
                                        }
                                      })
                                    ]
                                  )
                                ]
                              )
                            ])
                          ],
                          2
                        )
                      ]),
                      t._v(' '),
                      i('div', { staticClass: 'cool-lightbox__wrapper' }, [
                        i(
                          'div',
                          { staticClass: 'cool-lightbox__slide' },
                          [
                            i(
                              'transition',
                              {
                                attrs: {
                                  name: 'cool-lightbox-slide-change',
                                  mode: 'out-in'
                                }
                              },
                              [
                                t.videoUrl
                                  ? i(
                                      'div',
                                      {
                                        key: 'video',
                                        staticClass: 'cool-lightbox__iframe'
                                      },
                                      [
                                        i(
                                          'transition',
                                          {
                                            attrs: {
                                              name:
                                                'cool-lightbox-slide-change',
                                              mode: 'out-in'
                                            }
                                          },
                                          [
                                            t.isMp4
                                              ? t._e()
                                              : i('iframe', {
                                                  key: t.videoUrl,
                                                  staticClass:
                                                    'cool-lightbox-video',
                                                  style: t.aspectRatioVideo,
                                                  attrs: {
                                                    src: t.videoUrl,
                                                    frameborder: '0',
                                                    allow:
                                                      'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture',
                                                    allowfullscreen: ''
                                                  }
                                                }),
                                            t._v(' '),
                                            t.isMp4
                                              ? i(
                                                  'video',
                                                  {
                                                    key: t.videoUrl,
                                                    staticClass:
                                                      'cool-lightbox-video',
                                                    style: t.aspectRatioVideo,
                                                    attrs: {
                                                      controls: '',
                                                      controlslist:
                                                        'nodownload',
                                                      poster: ''
                                                    }
                                                  },
                                                  [
                                                    i('source', {
                                                      attrs: {
                                                        src: t.videoUrl,
                                                        type: 'video/mp4'
                                                      }
                                                    }),
                                                    t._v(
                                                      "\n                  Sorry, your browser doesn't support embedded videos\n                "
                                                    )
                                                  ]
                                                )
                                              : t._e()
                                          ]
                                        )
                                      ],
                                      1
                                    )
                                  : i(
                                      'div',
                                      {
                                        key: 'image',
                                        staticClass:
                                          'cool-lightbox__slide__img',
                                        style: t.imgWrapperStyle
                                      },
                                      [
                                        i(
                                          'transition',
                                          {
                                            attrs: {
                                              name:
                                                'cool-lightbox-slide-change',
                                              mode: 'out-in'
                                            }
                                          },
                                          [
                                            i('img', {
                                              key: t.imgIndex,
                                              attrs: {
                                                src: t.itemSrc,
                                                draggable: 'false'
                                              },
                                              on: {
                                                click: t.zoomImage,
                                                load(o) {
                                                  t.imageLoading = !1
                                                },
                                                mousedown(o) {
                                                  return t.handleMouseDown(o)
                                                },
                                                mouseup(o) {
                                                  return t.handleMouseUp(o)
                                                },
                                                mousemove(o) {
                                                  return t.handleMouseMove(o)
                                                }
                                              }
                                            })
                                          ]
                                        ),
                                        t._v(' '),
                                        i('div', {
                                          directives: [
                                            {
                                              name: 'show',
                                              rawName: 'v-show',
                                              value: t.imageLoading,
                                              expression: 'imageLoading'
                                            }
                                          ],
                                          staticClass: 'cool-lightbox-loading'
                                        })
                                      ],
                                      1
                                    )
                              ]
                            )
                          ],
                          1
                        )
                      ]),
                      t._v(' '),
                      i('transition', { attrs: { name: 'modal' } }, [
                        i(
                          'div',
                          {
                            directives: [
                              {
                                name: 'show',
                                rawName: 'v-show',
                                value:
                                  t.isObject &&
                                  (t.items[t.imgIndex].title ||
                                    t.items[t.imgIndex].description),
                                expression:
                                  'isObject && (items[imgIndex].title || items[imgIndex].description)'
                              }
                            ],
                            key: 'caption-block',
                            staticClass: 'cool-lightbox-caption'
                          },
                          [
                            i(
                              'transition',
                              {
                                attrs: {
                                  name: 'cool-lightbox-slide-change',
                                  mode: 'out-in'
                                }
                              },
                              [
                                t.isObject && t.items[t.imgIndex].title
                                  ? i('h6', { key: 'title' }, [
                                      t._v(t._s(t.items[t.imgIndex].title))
                                    ])
                                  : t._e()
                              ]
                            ),
                            t._v(' '),
                            i(
                              'transition',
                              {
                                attrs: {
                                  name: 'cool-lightbox-slide-change',
                                  mode: 'out-in'
                                }
                              },
                              [
                                t.isObject && t.items[t.imgIndex].description
                                  ? i('p', { key: 'description' }, [
                                      t._v(
                                        t._s(t.items[t.imgIndex].description)
                                      )
                                    ])
                                  : t._e()
                              ]
                            )
                          ],
                          1
                        )
                      ]),
                      t._v(' '),
                      i(
                        'div',
                        {
                          staticClass: 'cool-lightbox-toolbar',
                          class: t.buttonsClasses
                        },
                        [
                          this.slideshow
                            ? i(
                                'button',
                                {
                                  staticClass: 'cool-lightbox-toolbar__btn',
                                  on: { click: t.togglePlaySlideshow }
                                },
                                [
                                  t.isPlayingSlideShow
                                    ? i(
                                        'svg',
                                        {
                                          attrs: {
                                            xmlns: 'http://www.w3.org/2000/svg',
                                            viewBox: '0 0 24 24'
                                          }
                                        },
                                        [
                                          i('path', {
                                            attrs: {
                                              d:
                                                'M8.33 5.75h2.2v12.5h-2.2V5.75zm5.15 0h2.2v12.5h-2.2V5.75z'
                                            }
                                          })
                                        ]
                                      )
                                    : i(
                                        'svg',
                                        {
                                          attrs: {
                                            xmlns: 'http://www.w3.org/2000/svg',
                                            viewBox: '0 0 24 24'
                                          }
                                        },
                                        [
                                          i('path', {
                                            attrs: {
                                              d: 'M6.5 5.4v13.2l11-6.6z'
                                            }
                                          })
                                        ]
                                      )
                                ]
                              )
                            : t._e(),
                          t._v(' '),
                          i(
                            'button',
                            {
                              staticClass: 'cool-lightbox-toolbar__btn',
                              on: {
                                click(o) {
                                  t.showThumbs = !t.showThumbs
                                }
                              }
                            },
                            [
                              i(
                                'svg',
                                {
                                  attrs: {
                                    xmlns: 'http://www.w3.org/2000/svg',
                                    viewBox: '0 0 24 24'
                                  }
                                },
                                [
                                  i('path', {
                                    attrs: {
                                      d:
                                        'M14.59 14.59h3.76v3.76h-3.76v-3.76zm-4.47 \n            0h3.76v3.76h-3.76v-3.76zm-4.47 0h3.76v3.76H5.65v-3.76zm8.94-4.47h3.76v3.76h-3.76v-3.76zm-4.47 \n            0h3.76v3.76h-3.76v-3.76zm-4.47 0h3.76v3.76H5.65v-3.76zm8.94-4.47h3.76v3.76h-3.76V5.65zm-4.47 \n            0h3.76v3.76h-3.76V5.65zm-4.47 0h3.76v3.76H5.65V5.65z'
                                    }
                                  })
                                ]
                              )
                            ]
                          ),
                          t._v(' '),
                          i(
                            'button',
                            {
                              staticClass: 'cool-lightbox-toolbar__btn',
                              on: { click: t.close }
                            },
                            [
                              t._t('close', [
                                i(
                                  'svg',
                                  {
                                    attrs: {
                                      xmlns: 'http://www.w3.org/2000/svg',
                                      viewBox: '0 0 24 24'
                                    }
                                  },
                                  [
                                    i('path', {
                                      attrs: {
                                        d:
                                          'M12 10.6L6.6 5.2 5.2 6.6l5.4 5.4-5.4 5.4 1.4 1.4 5.4-5.4 5.4 5.4 1.4-1.4-5.4-5.4 5.4-5.4-1.4-1.4-5.4 5.4z'
                                      }
                                    })
                                  ]
                                )
                              ])
                            ],
                            2
                          )
                        ]
                      )
                    ],
                    1
                  )
                ]
              )
            : t._e()
        ])
      },
      staticRenderFns: []
    },
    function(t) {
      t &&
        t('data-v-74728afd_0', {
          source:
            ".cool-lightbox{position:fixed;left:0;bottom:0;top:0;display:flex;z-index:9999999;align-items:center;justify-content:center;right:0;transition:all .3s ease}.cool-lightbox .cool-lightbox-thumbs{position:absolute;height:100vh;overflow-y:auto;width:102px;right:-102px;top:0;overflow-x:hidden;transition:all .3s ease;background-color:#ddd;scrollbar-width:thin;scrollbar-color:#fa4242 rgba(175,175,175,.9)}.cool-lightbox .cool-lightbox-thumbs::-webkit-scrollbar{width:6px;height:6px}.cool-lightbox .cool-lightbox-thumbs::-webkit-scrollbar-button{width:0;height:0}.cool-lightbox .cool-lightbox-thumbs::-webkit-scrollbar-thumb{background:#fa4242;border:0 none #fff;border-radius:50px}.cool-lightbox .cool-lightbox-thumbs::-webkit-scrollbar-thumb:hover{background:#fff}.cool-lightbox .cool-lightbox-thumbs::-webkit-scrollbar-thumb:active{background:#000}.cool-lightbox .cool-lightbox-thumbs::-webkit-scrollbar-track{background:#e1e1e1;border:0 none #fff;border-radius:8px}.cool-lightbox .cool-lightbox-thumbs::-webkit-scrollbar-track:hover{background:#666}.cool-lightbox .cool-lightbox-thumbs::-webkit-scrollbar-track:active{background:#333}.cool-lightbox .cool-lightbox-thumbs::-webkit-scrollbar-corner{background:0 0}@media (min-width:767px){.cool-lightbox .cool-lightbox-thumbs{width:212px;right:-212px}}.cool-lightbox .cool-lightbox-thumbs .cool-lightbox-thumbs__list{display:flex;flex-wrap:wrap;padding:2px;padding-right:0}.cool-lightbox .cool-lightbox-thumbs .cool-lightbox-thumbs__list .cool-lightbox__thumb{background-color:#000;width:100%;margin-right:2px;margin-bottom:2px;display:block;height:75px;position:relative}@media (min-width:767px){.cool-lightbox .cool-lightbox-thumbs .cool-lightbox-thumbs__list .cool-lightbox__thumb{width:calc(100%/2 - 2px)}}.cool-lightbox .cool-lightbox-thumbs .cool-lightbox-thumbs__list .cool-lightbox__thumb:before{top:0;left:0;right:0;bottom:0;opacity:0;content:'';z-index:150;transition:all .3s ease;position:absolute;visibility:hidden;border:3px solid #fa4242}.cool-lightbox .cool-lightbox-thumbs .cool-lightbox-thumbs__list .cool-lightbox__thumb img{width:100%;height:100%;object-fit:cover}.cool-lightbox .cool-lightbox-thumbs .cool-lightbox-thumbs__list .cool-lightbox__thumb.is-video .cool-lightbox__thumb__icon{position:absolute;z-index:100;top:50%;left:50%;width:25px;height:25px;transform:translate(-50%,-50%)}.cool-lightbox .cool-lightbox-thumbs .cool-lightbox-thumbs__list .cool-lightbox__thumb.is-video .cool-lightbox__thumb__icon path{fill:#fff}.cool-lightbox .cool-lightbox-thumbs .cool-lightbox-thumbs__list .cool-lightbox__thumb.is-video:after{content:'';top:0;left:0;right:0;bottom:0;z-index:50;position:absolute;background:rgba(0,0,0,.6)}.cool-lightbox .cool-lightbox-thumbs .cool-lightbox-thumbs__list .cool-lightbox__thumb.active:before,.cool-lightbox .cool-lightbox-thumbs .cool-lightbox-thumbs__list .cool-lightbox__thumb:hover:before{opacity:1;visibility:visible}.cool-lightbox .cool-lightbox__inner{padding:60px 0;position:absolute;height:100%;top:0;left:0;right:0;overflow:hidden;transition:all .3s ease}.cool-lightbox .cool-lightbox__progressbar{position:absolute;top:0;left:0;right:0;height:2px;z-index:500;transform-origin:0;transform:scaleX(0);transition:transform 3s linear;display:block}.cool-lightbox.cool-lightbox--can-zoom .cool-lightbox__slide img{cursor:zoom-in}.cool-lightbox.cool-lightbox--is-zooming .cool-lightbox__slide img{cursor:move;cursor:grab;cursor:-moz-grab;cursor:-webkit-grab}.cool-lightbox.cool-lightbox--is-zooming .cool-lightbox-caption{opacity:0}.cool-lightbox.cool-lightbox--show-thumbs .cool-lightbox__inner{right:102px}@media (min-width:767px){.cool-lightbox.cool-lightbox--show-thumbs .cool-lightbox__inner{right:212px}}.cool-lightbox.cool-lightbox--show-thumbs .cool-lightbox-thumbs{right:0}.cool-lightbox *{box-sizing:border-box;padding:0;margin:0}.cool-lightbox button{background:0 0;border:none;cursor:pointer;outline:0}.cool-lightbox svg path{fill:currentColor}.cool-lightbox .cool-lightbox-button{padding:21px 16px 21px 4px;height:100px;opacity:1;z-index:800;color:#ccc;transition:all .3s ease;position:absolute;top:calc(50% - 50px);width:54px;transition:all .3s ease;visibility:visible}@media (min-width:767px){.cool-lightbox .cool-lightbox-button{width:70px;padding:31px 26px 31px 6px}}.cool-lightbox .cool-lightbox-button.hidden{opacity:0;visibility:hidden}.cool-lightbox .cool-lightbox-button:hover{color:#fff}.cool-lightbox .cool-lightbox-button>.cool-lightbox-button__icon{padding:7px;display:flex;align-items:center;justify-content:center;background:rgba(30,30,30,.6)}.cool-lightbox .cool-lightbox-button>.cool-lightbox-button__icon>svg{width:100%;height:100%}.cool-lightbox .cool-lightbox-button.cool-lightbox-button--prev{left:0}.cool-lightbox .cool-lightbox-button.cool-lightbox-button--next{right:0;padding:21px 4px 21px 16px}@media (min-width:767px){.cool-lightbox .cool-lightbox-button.cool-lightbox-button--next{padding:31px 6px 31px 26px}}.cool-lightbox .cool-lightbox__iframe{width:100%;display:flex;align-items:center;justify-content:center;position:relative}.cool-lightbox .cool-lightbox__iframe iframe{width:100%;height:100%}@media (min-width:767px){.cool-lightbox .cool-lightbox__iframe iframe{max-width:80vw;max-height:80vh}}.cool-lightbox .cool-lightbox__wrapper{width:100%;height:100%}.cool-lightbox .cool-lightbox__slide{width:100%;height:100%;display:flex;position:relative}.cool-lightbox .cool-lightbox__slide .cool-lightbox__slide__img{position:absolute;height:100%;width:100%;left:50%;top:50%;-webkit-backface-visibility:hidden;backface-visibility:hidden;transform:translate3d(-50%,-50%,0) scale3d(1,1,1);transition:all .3s ease;display:flex}.cool-lightbox .cool-lightbox__slide img{max-width:100%;max-height:100%;margin:auto;z-index:9999;box-shadow:0 0 1.5rem rgba(0,0,0,.45)}.cool-lightbox-toolbar{position:absolute;top:0;right:0;opacity:1;display:flex;transition:all .3s ease;visibility:visible}.cool-lightbox-toolbar.hidden{opacity:0;visibility:hidden}.cool-lightbox-toolbar .cool-lightbox-toolbar__btn{background:rgba(30,30,30,.6);border:0;border-radius:0;box-shadow:none;cursor:pointer;justify-content:center;align-items:center;display:inline-flex;margin:0;padding:9px;position:relative;transition:color .2s;vertical-align:top;visibility:inherit;width:40px;height:40px;color:#ccc}@media (min-width:767px){.cool-lightbox-toolbar .cool-lightbox-toolbar__btn{width:44px;height:44px;padding:10px}}.cool-lightbox-toolbar .cool-lightbox-toolbar__btn>svg{width:100%;height:100%}.cool-lightbox-toolbar .cool-lightbox-toolbar__btn:hover{color:#fff}.cool-lightbox-caption{bottom:0;color:#eee;font-size:14px;font-weight:400;left:0;opacity:1;line-height:1.5;padding:18px 28px 16px 24px;pointer-events:none;right:0;text-align:center;z-index:99996;direction:ltr;position:absolute;transition:opacity .25s ease,visibility 0s ease .25s;z-index:99997;background:linear-gradient(0deg,rgba(0,0,0,.75) 0,rgba(0,0,0,.3) 50%,rgba(0,0,0,.15) 65%,rgba(0,0,0,.075) 75.5%,rgba(0,0,0,.037) 82.85%,rgba(0,0,0,.019) 88%,transparent)}@media (min-width:767px){.cool-lightbox-caption{padding:22px 30px 23px 30px}}.cool-lightbox-caption h6{font-size:14px;margin:0 0 6px 0;line-height:130%}@media (min-width:767px){.cool-lightbox-caption h6{font-size:16px;margin:0 0 6px 0}}.cool-lightbox-caption p{font-size:13px;line-height:130%;color:#ccc}@media (min-width:767px){.cool-lightbox-caption p{font-size:15px}}.cool-lightbox-modal-enter-active,.cool-lightbox-modal-leave-active{transition:opacity .35s}.cool-lightbox-modal-enter,.cool-lightbox-modal-leave-to{opacity:0}.cool-lightbox-slide-change-enter-active,.cool-lightbox-slide-change-leave-active{transition:opacity .27s}.cool-lightbox-slide-change-enter,.cool-lightbox-slide-change-leave-to{opacity:0}.cool-lightbox-loading{animation:cool-lightbox-rotate 1s linear infinite;background:0 0;border:4px solid #888;border-bottom-color:#fff;border-radius:50%;height:50px;left:50%;margin:-25px 0 0 -25px;opacity:.7;padding:0;position:absolute;top:50%;width:50px;z-index:500}@keyframes cool-lightbox-rotate{100%{transform:rotate(360deg)}}",
          map: void 0,
          media: void 0
        })
    },
    s,
    void 0,
    !1,
    void 0,
    i,
    void 0
  )
  const g = { install: l }
  let b = null
  return (
    typeof window !== 'undefined'
      ? (b = window.Vue)
      : typeof global !== 'undefined' && (b = global.vue),
    b && b.use(g),
    (c.install = l),
    (t.default = c),
    t
  )
})({})
/* eslint-enable */
// require('vue-cool-lightbox')
Vue.component('vue-cool-lightbox', CoolLightBox.default, {
  name: 'CoolLightBox'
})
