export const runAsyncHelper = async ({ todo }) => {

  try {

    let res = null

    if (Array.isArray(todo)) res = await Promise.all(todo)
    else res = await todo()

    return res

  } catch (err) {

    console.error(err)

  }
}