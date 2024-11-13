import { useState } from "react";
import "./index.css";

export default function App() {
  const [items, setItems] = useState([]);

  function handleAddItem(item) {
    setItems((items) => [...items, item]);
  }

  function handleDeleteItem(id) {
    setItems((items) => items.filter((items) => items.id !== id));
  }

  function handleToggleItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }
  return (
    <div className="grocery-list">
      <GroceryList onAddItems={handleAddItem} />
      <PackingList
        items={items}
        key={items.id}
        onDeleteItem={handleDeleteItem}
        onToggleItem={handleToggleItem}
      />
    </div>
  );
}

function GroceryList({ onAddItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();

    if (!description) return alert(`Item cannot be blank.`);

    const newItems = { description, quantity, packed: false, id: Date.now() };

    onAddItems(newItems);
    setDescription("");
    setQuantity(1);
  }

  return (
    <div>
      <h1>GROCERY LIST</h1>
      <form onSubmit={handleSubmit}>
        <select
          className="quatity"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
        >
          {[...Array(100)]
            .map((_, i) => i + 1)
            .map((i) => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
        </select>
        <input
          className="items-input"
          type="text"
          placeholder="Enter the item...."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button>Add Item</button>
      </form>
    </div>
  );
}

function PackingList({ items, onDeleteItem, onToggleItem }) {
  // const newItems = items;
  return (
    <ul>
      {items.map((item) => (
        <Item
          item={item}
          onDeleteItem={onDeleteItem}
          key={item.id}
          onToggleItem={onToggleItem}
        />
      ))}
    </ul>
  );
}

function Item({ item, onDeleteItem, onToggleItem }) {
  return (
    <li className="packinglist">
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => onToggleItem(item.id)}
      />

      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <div>
        <button onClick={() => onDeleteItem(item.id)}>🗑</button>
      </div>
    </li>
  );
}
