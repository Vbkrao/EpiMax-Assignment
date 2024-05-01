import assert from "node:assert";
import test from "node:test";

async function createNote(title: string, content: string) {
  let req = await fetch("http://127.0.0.1:4000/notes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, content }),
  });

  let res = (await req.json()) as {
    title: string;
    _id: string;
    content: string;
  };

  return {
    id: res._id,
    title: res.title,
    content: res.content,
  };
}

test("API tests", async (t) => {
  let this_id: string;

  await t.test("test 0 - create note", async (t) => {
    let { id, title, content } = await createNote("test", "test");
    this_id = id;
    assert.equal(title, "test");
    assert.equal(content, "test");
  });

  await t.test("test 1 - Get note by id", async (t) => {
    let req = await fetch(`http://127.0.0.1:4000/notes/${this_id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    let res = (await req.json()) as { title: string };
    assert.equal(res.title, "test");
  });

  await t.test("test 2 - update note by id", async (t) => {
    let req = await fetch(`http://127.0.0.1:4000/notes/${this_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: "test2", content: "test2" }),
    });

    let res = (await req.json()) as { title: string };
    assert.equal(res.title, "test");
  });

  await t.test("test 3 - create a duplicate note", async (t) => {
    let req = await fetch("http://127.0.0.1:4000/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: "test2", content: "test2" }),
    });

    let status = req.status;
    assert.equal(status, 400);
  });

  await t.test("test 4 - delete note by id", async (t) => {
    let req = await fetch(`http://127.0.0.1:4000/notes/${this_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    let res = (await req.json()) as { title: string };
    assert.equal(res.title, "test2");
  });
});
