// import { getAuthorType } from './author_type.js'
// import { getCategory } from './categories'
// import { getUrl } from '@/assets/js/util'

export async function apiGetAds(params, axios) {
  // console.log(params)
  const isNeedFakeAds = false
  const urlParams = {
    category_id: params.category_id,
    per_page: 99,
  }
  if (params.type_id) urlParams.type_id = params.type_id
  if (params.author_type_id) urlParams.author_type_id = params.author_type_id
  if (params.with) urlParams.with = params.with
  const url = '/advertisements'
  // console.log(urlParams)
  const { data } = urlParams.category_id
    ? await axios
        .get(url, { params: urlParams })
        .catch((error) => console.error(error))
    : { data: null }
  // console.log(data)
  const fakeAds = [
    {
      id: 1,
      title: 'asdadasd',
      author: { first_name: 'loh' },
      account_type_id: 3,
      price: 9999,
      logo: 'https://via.placeholder.com/570x295',
      photo: [
        'https://via.placeholder.com/550x240',
        'https://via.placeholder.com/550x240',
        'https://via.placeholder.com/550x240',
        'https://via.placeholder.com/550x240',
        'https://via.placeholder.com/550x240',
        'https://via.placeholder.com/550x240',
        'https://via.placeholder.com/550x240',
        'https://via.placeholder.com/550x240',
        'https://via.placeholder.com/550x240',
        'https://via.placeholder.com/550x240',
        'https://via.placeholder.com/550x240',
      ],
      description:
        'Здесь расположено множество заведений, предлагающих широкий спектр разнообразных товаров и услуг.',
      short_desc:
        'Здесь расположено множество заведений, предлагающих широкий спектр разнообразных товаров и услуг.',
      categories: [
        {
          title: 'Тест',
        },
        {
          title: 'Тест 2',
        },
        {
          title: 'Тест 3',
        },
      ],
      address: [
        {
          street: 'г. Ульяновск, улица Победы, д.39',
          metro: 'Парк Юности',
        },
        {
          street: 'г. Ульяновск, улица Победы, д.39',
          metro: 'Парк Юности',
        },
        {
          street: 'г. Ульяновск, улица Победы, д.39',
          metro: 'Парк Юности',
        },
        {
          street: 'г. Ульяновск, улица Победы, д.39',
          metro: 'Парк Юности',
        },
        {
          street: 'г. Ульяновск, улица Победы, д.39',
          metro: 'Парк Юности',
        },
        {
          street: 'г. Ульяновск, улица Победы, д.39',
          metro: 'Парк Юности',
        },
        {
          street: 'г. Ульяновск, улица Победы, д.39',
          metro: 'Парк Юности',
        },
        {
          street: 'г. Ульяновск, улица Победы, д.39',
          metro: 'Парк Юности',
        },
        {
          street: 'г. Ульяновск, улица Победы, д.39',
          metro: 'Парк Юности',
        },
        {
          street: 'г. Ульяновск, улица Победы, д.39',
          metro: 'Парк Юности',
        },
        {
          street: 'г. Ульяновск, улица Победы, д.39',
          metro: 'Парк Юности',
        },
      ],
      city: 'Саранск',
      phone: [
        '+78005553535',
        '+78005553535',
        '+78005553535',
        '+78005553535',
        '+78005553535',
        '+78005553535',
        '+78005553535',
        '+78005553535',
      ],
      website: 'https://ya.ru/',
      presentation: 'fdgdfg',
      price_list: 'sdasd',
      ogrn: '1242412421414',
      social: [
        '//vk.com/asdasd',
        '//ok.ru/asdasd',
        '//instagram.com/asdasd',
        '//facebook.com/asdasd',
      ],
      video: ['V8fvWZPIIo0', '45sbEqCuvfU'],
    },
  ]
  return {
    ads: isNeedFakeAds ? fakeAds : data.data,
    links: data ? data.links : null,
    queryParams: params,
  }
}

export function getAuthorTypeId(context) {
  let authorTypeId = null
  if (context.params.author_type === 'частники') {
    authorTypeId = 1
  } else if (context.params.author_type === 'фирмы') {
    authorTypeId = 2
  } else if (context.params.author_type === 'все-фирмы-и-магазины') {
    authorTypeId = 2
  } else if (context.params.author_type === 'торговые-центры') {
    authorTypeId = 5
  } else if (context.params.author_type === 'интернет-магазины') {
    authorTypeId = 4
  }
  return authorTypeId
}

export function getAdTypeId(context) {
  let typeId = null
  if (context.route.path.includes('/продажа/')) {
    typeId = 2
  } else if (context.params.author_type === 'заказчики') {
    typeId = 3
  } else typeId = 1
  return typeId
}
