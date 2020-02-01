/**
 * Netlify Identity Service
 * https://www.gatsbyjs.org/blog/2018-12-17-turning-the-static-dynamic/
 */

import netlifyIdentity from 'netlify-identity-widget'

export const isBrowser = () => typeof window !== 'undefined'

export const isLoggedIn = () => {
  if (!isBrowser()) {
    return false
  }

  const user = netlifyIdentity.currentUser()
  return !!user
}
