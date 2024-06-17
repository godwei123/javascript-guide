# Redis

:::tip
NOSQL 数据库
:::

## 安装

```bash
brew install redis
```

## value 类型

- 字符串 (String)
- 列表 (List)
- 集合 (Set)
- 有序集合 (SortedSet)
- 哈希 (Hash)
- 消息队列 (Stream)
- 地理空间 (Geospatial)
- HyperLoglog
- 位图 (Bitmap)
- 位域 (Bitfield)

## 命令

- [KEYS](#keys)
- [SET](#set)
- [GET](#get)
- [DEL](#del)
- [EXISTS](#exists)
- [EXPIRE](#expire)
- [TTL](#ttl)

### KEYS

```bash
# 查看所有 key
# keys pattern
# 不建议在生产环境使用，会阻塞 redis

keys *
```

### SET

```bash
# 设置 key value，如果 key 已经存在则覆盖
# set key value

set name "zhangsan"
```

### GET

```bash
# 获取 key 的值，如果 key 不存在返回 nil
# get key

get name
```

### DEL

```bash
# 删除 key，返回删除的 key 的数量
# del key

del name
```

### EXISTS

```bash
# 判断 key 是否存在，存在返回 1，不存在返回 0
# exists key

exists name
```

### EXPIRE

```bash
# 设置 key 的过期时间，单位秒，过期后 key 会被删除
# expire key seconds

expire name 10
```

### TTL

```bash
# 查看 key 的剩余过期时间，单位秒，-1 表示永不过期，-2 表示 key 不存在
# ttl key

ttl name
```

## String 类型

字符串类型是 Redis 中最简单的数据类型，一个 key 对应一个 value。最大可以存储 512MB。value 可以是字符串、数字、浮点数。

```bash
set name "zhangsan" # 设置 key value

get name # 获取 key 的值

mset name "zhangsan" age 18 # 批量设置 key value

mget name age # 批量获取 key 的值

append name "lisi" # 追加字符串

strlen name # 获取字符串长度

getset name "wangwu" # 设置 key 的值并返回旧值

incr age # 增加，value 必须是数字

decr age # 减少

incrbyfloat age 1.5 # 增加浮点数

incrby age 2 # 自增，指定步长

setnx name "zhang san" # 如果 key 不存在则设置 key value

setex name 10 "zhang san" # 设置 key value 并设置过期时间
```

:::tip
key 层级结构，可以使用 `:` 分割，例如 `user:1:name`

key 命名规范，建议使用 `:` 分割，例如 `user:1:name`，不建议使用 `.` 分割，例如 `user.1.name`

:::

## Hash 类型

哈希类型是 Redis 中用于存储对象的数据类型，一个 key 对应一个哈希表，哈希表中存储了多个 key-value 对。哈希表中的 key 是唯一的，value 可以是字符串、数字、浮点数。

```bash
hset user:1 name "zhang san" # 设置 key field value

hget user:1 name # 获取 key field 的值

hmset user:1 name "zhang san" age 18 # 批量设置 key field value

hmget user:1 name age # 批量获取 key field

hgetall user:1 # 获取 key 的所有 field value

hdel user:1 name # 删除 key 的 field

hexists user:1 name # 判断 key 的 field

hkeys user:1 # 获取 key 的所有 field

hvals user:1 # 获取 key 的所有 value

hlen user:1 # 获取 key 的 field 数量

hincrby user:1 age 2 # 自增，指定步长

hincrbyfloat user:1 age 1.5 # 增加浮点数

hsetnx user name "zhang san" # 如果 key 的 field 不存在则设置 key field value

```

## List 类型

列表类型是 Redis 中用于存储列表的数据类型，一个 key 对应一个列表，列表中存储了多个元素。列表中的元素可以重复，元素可以是字符串、数字、浮点数。Redis 中的列表是一个**双向链表**，可以从两端插入、删除元素。

```bash
lpush user name "zhang san" # 从左边插入元素

rpush user name "zhang san" # 从右边插入元素

lrange user 0 -1 # 获取 key 的所有元素

lpop user # 从左边删除元素

rpop user # 从右边删除元素

lindex user 0 # 获取 key 的指定索引的元素

linsert user before "zhang san" "lisi" # 在指定元素前插入元素

linsert user after "zhang san" "lisi" # 在指定元素后插入元素

lrem user 0 "zhang san" # 删除指定元素

blpop user 10 # 从左边删除元素，如果 key 不存在则阻塞, 10 秒后超时

brpop user 10 # 从右边删除元素，如果 key 不存在则阻塞, 10 秒后超时
```

## Set 类型

Set 类型是 Redis 中用于存储集合的数据类型，一个 key 对应一个集合，集合中存储了多个元素。**集合中的元素不重复**，元素可以是字符串、数字、浮点数。支持集合的交集、并集、差集等操作。查找元素的时间复杂度为 O(1)。

```bash
sadd user "zhang san"  # 添加元素

sadd user "zhang" "san"  # 添加多个元素

smembers user # 获取 key 的所有元素

srem user "zhang san" # 删除元素

scard user # 获取 key 的元素数量

sismember user "zhang san" # 判断元素是否存在

sinter user1 user2 # 获取多个 key 的交集

sunion user1 user2 # 获取多个 key 的并集

sdiff user1 user2 # 获取多个 key 的差集

```

## SortedSet 类型

SortedSet 类型是 Redis 中用于存储有序集合的数据类型，一个 key 对应一个有序集合，集合中存储了多个元素。**有序集合中的元素不重复**，元素可以是字符串、数字、浮点数。有序集合中的元素按照 score 排序，score 相同的元素按照 value 排序。支持有序集合的交集、并集、差集等操作。查找元素的时间复杂度为 O(log(N))。底层使用跳表实现。

```bash
zadd user 1 "zhang san"  # 添加元素，zadd key score value

zadd user 2 "li si" 5 "wang wu"  # 添加多个元素

zrem user "zhang san" # 删除元素, zrem key value

zscore user "zhang san" # 获取元素的 score

zcard user # 获取 key 的元素数量

zrank user "zhang san" # 获取元素的排名，从 0 开始

zcount user 0 10 # 获取 score 在 0 到 10 之间的元素数量, zcount key min max, 包括 min 和 max

zincrby user 2 "zhang san" # 增加元素的 score, zincrby key increment value

zrange user 0 -1 # 获取 key 的所有元素, 从小到大排序, zrange key start stop

zrevrange user 0 -1 # 获取 key 的所有元素, 从大到小排序, zrevrange key start stop

zrangebyscore user 0 10 # 获取 score 在 0 到 10 之间的元素

zdiff user1 user2 # 获取多个 key 的差集

zinter user1 user2 # 获取多个 key 的交集

zunion user1 user2 # 获取多个 key 的并集

```

## Node.js 客户端

[文档](https://redis.io/docs/latest/develop/connect/clients/nodejs/)

## Java 客户端

- [Lettuce](https://lettuce.io/)
- [Jedis](https://redis.io/docs/latest/develop/connect/clients/java/jedis/)
- [Spring Data Redis](https://spring.io/projects/spring-data-redis)
