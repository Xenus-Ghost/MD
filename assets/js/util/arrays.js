export function listToTree(list, emptyChildren) {
  const map = {}
  let node
  const roots = []
  let i
  const listLength = list.length
  for (i = 0; i < listLength; i += 1) {
    map[list[i].id] = i // initialize the map
    // list[i].children = [] // initialize the children
  }
  for (i = 0; i < listLength; i += 1) {
    node = list[i]
    if (node.parent_id) {
      // if you have dangling branches check that map[node.parentId] exists
      if (!list[map[node.parent_id]].children)
        list[map[node.parent_id]].children = []
      list[map[node.parent_id]].children.push(node)
    } else {
      roots.push(node)
    }
  }
  return roots
}
