import { useEffect } from 'react'
import { useLiveQuery } from 'electric-sql/react'
import { genUUID } from 'electric-sql/util'
import { Items as Item } from './generated/client'
import { useElectric } from './ElectricProvider'

import './Example.css'

export const Example = () => {
  const { db } = useElectric()!
  const { results } = useLiveQuery(db.items.liveMany())

  useEffect(() => {
    const syncItems = async () => {
      // Resolves when the shape subscription has been established.
      const shape = await db.items.sync()

      // Resolves when the data has been synced into the local database.
      await shape.synced
    }

    syncItems()
  }, [])

  const addItem = async () => {
    await db.items.create({
      data: {
        id: genUUID(),
        task: 'New task',
        done: false,
      },
    })
  }

  const clearItems = async () => {
    await db.items.deleteMany()
  }

  const items: Item[] = results ?? []

  return (
    <div>
      <div className="controls">
        <button className="button" onClick={addItem}>
          Add
        </button>
        <button className="button" onClick={clearItems}>
          Clear
        </button>
      </div>
      {items.map((item: Item, index: number) => (
        <ItemLine key={index} item={item} />
      ))}
    </div>
  )
}

const ItemLine = ({ item }: { item: Item }) => {
  const { db } = useElectric()!

  const updateItem = async (task: string) => {
    await db.items.update({
      where: { id: item.id },
      data: { task },
    })
  }

  const toggleDone = async () => {
    await db.items.update({
      where: { id: item.id },
      data: { done: !item.done },
    })
  }

  return (
    <p className={`item ${item.done ? 'done' : ''}`}>
      <input
        type="checkbox"
        className="item-checkbox"
        checked={item.done}
        onChange={toggleDone}
      />
      <input
        type="text"
        className="item-input"
        value={item.task}
        onChange={(e) => {
          updateItem(e.currentTarget.value)
        }}
      />
    </p>
  )
} 