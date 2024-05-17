export default [
  {
    "statements": [
      "CREATE TABLE \"items\" (\n  \"id\" TEXT NOT NULL,\n  \"task\" TEXT NOT NULL,\n  \"done\" INTEGER NOT NULL,\n  \"created_at\" TEXT NOT NULL,\n  CONSTRAINT \"items_pkey\" PRIMARY KEY (\"id\")\n) WITHOUT ROWID;\n",
      "INSERT OR IGNORE INTO _electric_trigger_settings (namespace, tablename, flag) VALUES ('main', 'items', 1);",
      "DROP TRIGGER IF EXISTS update_ensure_main_items_primarykey;",
      "CREATE TRIGGER update_ensure_main_items_primarykey\n  BEFORE UPDATE ON \"main\".\"items\"\nBEGIN\n  SELECT\n    CASE\n      WHEN old.\"id\" != new.\"id\" THEN\n      \t\tRAISE (ABORT, 'cannot change the value of column id as it belongs to the primary key')\n    END;\nEND;",
      "DROP TRIGGER IF EXISTS insert_main_items_into_oplog;",
      "CREATE TRIGGER insert_main_items_into_oplog\n   AFTER INSERT ON \"main\".\"items\"\n   WHEN 1 = (SELECT flag from _electric_trigger_settings WHERE namespace = 'main' AND tablename = 'items')\nBEGIN\n  INSERT INTO _electric_oplog (namespace, tablename, optype, primaryKey, newRow, oldRow, timestamp)\n  VALUES ('main', 'items', 'INSERT', json_patch('{}', json_object('id', new.\"id\")), json_object('created_at', new.\"created_at\", 'done', new.\"done\", 'id', new.\"id\", 'task', new.\"task\"), NULL, NULL);\nEND;",
      "DROP TRIGGER IF EXISTS update_main_items_into_oplog;",
      "CREATE TRIGGER update_main_items_into_oplog\n   AFTER UPDATE ON \"main\".\"items\"\n   WHEN 1 = (SELECT flag from _electric_trigger_settings WHERE namespace = 'main' AND tablename = 'items')\nBEGIN\n  INSERT INTO _electric_oplog (namespace, tablename, optype, primaryKey, newRow, oldRow, timestamp)\n  VALUES ('main', 'items', 'UPDATE', json_patch('{}', json_object('id', new.\"id\")), json_object('created_at', new.\"created_at\", 'done', new.\"done\", 'id', new.\"id\", 'task', new.\"task\"), json_object('created_at', old.\"created_at\", 'done', old.\"done\", 'id', old.\"id\", 'task', old.\"task\"), NULL);\nEND;",
      "DROP TRIGGER IF EXISTS delete_main_items_into_oplog;",
      "CREATE TRIGGER delete_main_items_into_oplog\n   AFTER DELETE ON \"main\".\"items\"\n   WHEN 1 = (SELECT flag from _electric_trigger_settings WHERE namespace = 'main' AND tablename = 'items')\nBEGIN\n  INSERT INTO _electric_oplog (namespace, tablename, optype, primaryKey, newRow, oldRow, timestamp)\n  VALUES ('main', 'items', 'DELETE', json_patch('{}', json_object('id', old.\"id\")), NULL, json_object('created_at', old.\"created_at\", 'done', old.\"done\", 'id', old.\"id\", 'task', old.\"task\"), NULL);\nEND;"
    ],
    "version": "1"
  }
]