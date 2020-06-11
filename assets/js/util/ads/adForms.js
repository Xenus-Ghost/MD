export function getMaxCategories(params) {
  const { adType, authorType, accountType } = params
  console.log(adType)
  console.log(authorType)
  console.log(accountType)
  let max = 1
  // if ( adType === 3) max =
  if (adType === 1) {
    if (authorType === 1) {
      switch (accountType) {
        case 1:
          max = 1
          break
        case 2:
          max = 5
          break
        case 3:
          max = 0
          break
        default:
          max = 1
          break
      }
    } else if (authorType === 2) {
      switch (accountType) {
        case 1:
          max = 1
          break
        case 2:
          max = 5
          break
        case 3:
          max = 0
          break
        default:
          max = 1
          break
      }
    } else {
    }
  } else if (adType === 2) {
    if (authorType === 1) {
      if (accountType === 1) {
        max = 1
      } else if (accountType === 2) {
        max = 1
      } else {
        max = 1
      }
    } else if (authorType === 2) {
      if (accountType === 1) {
        max = 1
      } else if (accountType === 2) {
        max = 5
      } else {
        max = 0
      }
    } else if (authorType === 4) {
      if (accountType === 1) {
        max = 1
      } else if (accountType === 2) {
        max = 5
      } else {
        max = 0
      }
    } else if (authorType === 5) {
      if (accountType === 1) {
        max = 1
      } else if (accountType === 2) {
        max = 5
      } else {
        max = 0
      }
    } else if (authorType === 6) {
      if (accountType === 1) {
        max = 1
      } else if (accountType === 2) {
        max = 5
      } else {
        max = 0
      }
    } else if (authorType === 7) {
      if (accountType === 1) {
        max = 1
      } else if (accountType === 2) {
        max = 5
      } else {
        max = 0
      }
    }
  }
  return max
}

export function getMaxPhotos(params) {
  const { adType, authorType, accountType } = params
  const adTypeName =
    adType === 1 ? 'service' : adType === 2 ? 'sale' : 'customers'
  const accountTypeName =
    accountType === 1 ? 'free' : accountType === 2 ? 'pro' : 'premium'
  const authorTypeName =
    authorType === 1
      ? 'private'
      : authorType === 2
      ? 'firm'
      : authorType === 4
      ? 'onlineShop'
      : authorType === 5
      ? 'shoppingCenter'
      : authorType === 6
      ? 'plant'
      : 'building'
  const tariff = {
    service: {
      private: {
        free: 1,
        pro: 5,
        premium: 10,
      },
      firm: {
        free: 1,
        pro: 5,
        premium: 10,
      },
      onlineShop: {
        free: 1,
        pro: 5,
        premium: 10,
      },
      shoppingCenter: {
        free: 1,
        pro: 5,
        premium: 10,
      },
      plant: {
        free: 1,
        pro: 5,
        premium: 10,
      },
      buildings: {
        free: 1,
        pro: 5,
        premium: 10,
      },
    },
    sale: {
      private: {
        free: 5,
        pro: 10,
        premium: 20,
      },
      firm: {
        free: 1,
        pro: 5,
        premium: 10,
      },
      onlineShop: {
        free: 5,
        pro: 10,
        premium: 15,
      },
      shoppingCenter: {
        free: 0,
        pro: 10,
        premium: 15,
      },
      plant: {
        free: 5,
        pro: 10,
        premium: 15,
      },
      buildings: {
        free: 0,
        pro: 10,
        premium: 15,
      },
    },
    customers: {
      private: {
        free: 1,
        pro: 5,
        premium: 10,
      },
      firm: {
        free: 1,
        pro: 5,
        premium: 10,
      },
      onlineShop: {
        free: 1,
        pro: 5,
        premium: 10,
      },
      shoppingCenter: {
        free: 1,
        pro: 5,
        premium: 10,
      },
      plant: {
        free: 1,
        pro: 5,
        premium: 10,
      },
      buildings: {
        free: 1,
        pro: 5,
        premium: 10,
      },
    },
  }
  return tariff[adTypeName][authorTypeName][accountTypeName]
}
