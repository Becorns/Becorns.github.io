---
title: SQL 学习笔记
description: 常用 SQL 语法、查询与事务示例
date: 2025-01-15
tags: [数据库, SQL, 笔记]
---

> 本文记录日常开发中常用的 SQL 语法片段。

## 基础查询



### SELECT

```sql
SELECT id, name, created_at
FROM users
WHERE status = 'active'
ORDER BY created_at DESC
LIMIT 20;
```

### 去重与聚合

| 函数 | 作用 |
| ---- | ---- |
| `COUNT(*)` | 统计行数 |
| `SUM(amount)` | 求和 |
| `AVG(price)` | 求平均值 |
| `MAX / MIN` | 最大值 / 最小值 |

```sql
SELECT COUNT(*) AS total, AVG(price) AS avg_price
FROM orders;
```

## 表连接

### INNER JOIN

```sql
SELECT u.name, o.amount
FROM orders o
INNER JOIN users u ON o.user_id = u.id;
```

### LEFT JOIN

保留左表全部记录，右表无匹配时字段为 `NULL`。

## 索引

为高频查询字段建立索引可以显著提升性能：

- 唯一索引：`CREATE UNIQUE INDEX idx_email ON users(email);`
- 组合索引：`CREATE INDEX idx_user_status ON users(status, created_at);`

## 事务

```sql
BEGIN;
UPDATE accounts SET balance = balance - 100 WHERE id = 1;
UPDATE accounts SET balance = balance + 100 WHERE id = 2;
COMMIT;
```

## 小结

- 查询优先使用索引列过滤
- 大批量写入建议分批提交
- 事务隔离级别按业务场景选择
