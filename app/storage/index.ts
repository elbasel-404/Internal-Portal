import { createStorage } from "unstorage"
import fsDriver from "unstorage/drivers/fs"

export const environmentStorage = createStorage({
  driver: fsDriver({
    base: "./app/storage/environment",
  }),
})

// ! Check for existence
// await storage.hasItem("foo:bar");
// await storage.has("foo:bar");

// ! Get an item
// await storage.getItem("foo:bar");
// await storage.get("foo:bar");

// ! Set an item
// await storage.setItem("foo:bar", "baz");
// await storage.set("foo:bar", "baz");

// ! Remove an item
// await storage.removeItem("foo:bar", { removeMeta: true });
// same as await storage.removeItem("foo:bar", true);
// await storage.remove("foo:bar");
// await storage.del("foo:bar");

// ! Type an item
// await storage.getItem<string>("k"); // => <string>
// await storage.getItemRaw<Buffer>("k"); // => <Buffer>
// storage.setItem<string>("k", "val"); // check ok
// storage.setItemRaw<string>("k", "val"); // check ok

// ! Get all keys
// await storage.getKeys();
// await storage.keys();

// ! Clear all data
// await storage.clear();

// ! Set meta information
// await storage.getMeta("foo:bar"); // For fs driver returns an object like { mtime, atime, size }
// await storage.setMeta("foo:bar", { flag: 1 });
// await storage.removeMeta("foo:bar");
// Same as storage.removeItem('foo:bar$')

// ! Type check setItem parameters:
// storage.setItem<string>("k", 123); // ts error
// storage.setItemRaw<string>("k", 123); // ts error

// ! Typed storage instance:
// const storage = createStorage<string>();
// await storage.getItem("k"); // => <string>
// storage.setItem("k", "val"); // Check ok
// storage.setItem("k", 123); // TS error

// const storage = createStorage<string>();
// storage.setItem<number>("k", 123); // TS error: <number> is not compatible with <string>

// ! Batch operations
// Same as storage.setItem('foo:bar$', { flag: 1 })
// await storage.getItems()

// Value can be a Buffer, Array or Driver's raw format
// const value = await storage.getItemRaw("foo:bar.bin");
// await storage.setItemRaw("data/test.bin", new Uint8Array([1, 2, 3]));
