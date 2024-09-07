---
create_time: 2024-06-22 00:49:32
---

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

## 缓存更新策略

:::pro-table

```json5
{
  columns: [
    {
      key: "name",
      title: "缓存更新策略",
      width: "200",
    },
    {
      key: "memory",
      title: "内存淘汰",
    },
    {
      key: "timeout",
      title: "超时剔除",
    },
    {
      key: "update",
      title: "主动更新",
    },
  ],
  data: [
    {
      name: "特点",
      memory: "不用自己维护，利用Redis的内存淘汰机制，当内存不足时自动淘汰部分数据。下次查询时更新缓存。",
      timeout: "给缓存数据添加TTL时间，到期后自动删除缓存。下次查询时更新缓存。",
      update: "编写业务逻辑，在修改数据库的同时，更新缓存。",
    },
    {
      name: "一致性",
      memory: "差",
      timeout: "差",
      update: "好",
    },
    {
      name: "维护成本",
      memory: "无",
      timeout: "低",
      update: "高",
    },
  ],
}
```

:::

## 主动更新策略

### Cache Aside（旁路缓存）

**概念：**

Cache Aside 是一种常见的缓存模式，也是最简单的一种缓存模式。在 Cache Aside 模式中，应用程序首先从缓存中读取数据，如果缓存中不存在，则从数据库中读取数据，并将数据写入缓存中。在更新数据时，应用程序**首先更新数据库中的数据，然后删除缓存中的数据**。当下一次请求到来时，应用程序会从数据库中读取最新的数据，并将其写入缓存中。

**问题：**

Cache Aside 模式的优点是简单易用，缓存和数据库之间的数据一致性较好。但是，由于应用程序需要手动维护缓存和数据库之间的数据一致性，因此在高并发场景下，容易出现缓存和数据库之间的数据不一致的情况。

**场景：**

适用于读多写少的场景，数据一致性要求不高的场景。

### Read/Write Through（读写穿透）

**概念：**

Read/Write Through 是一种将缓存和数据库完全解耦的缓存模式。在 Read/Write Through 模式中，应用程序不直接访问缓存和数据库，而是通过一个中间层来访问缓存和数据库。当应用程序需要读取数据时，中间层首先从缓存中读取数据，如果缓存中不存在，则从数据库中读取数据，并将数据写入缓存中。当应用程序需要更新数据时，中间层会将更新操作发送到数据库中，并更新缓存中的数据。

**问题：**

Read/Write Through 模式的优点是完全解耦缓存和数据库，可以有效地提高系统的并发能力和可扩展性。但是，由于中间层需要处理缓存和数据库之间的数据一致性，因此实现起来较为复杂。

**场景：**

适用于读多写多的场景，数据一致性要求较高的场景。

### Write Behind Caching（异步缓存写入）

**概念：**

Write Behind Caching 是一种将缓存和数据库异步写入的缓存模式。在 Write Behind Caching 模式中，应用程序首先将更新操作写入缓存中，然后异步地将更新操作写入数据库中。当下一次请求到来时，应用程序会从缓存中读取数据，并将其写入数据库中。

**问题：**

Write Behind Caching 模式的优点是可以有效地提高系统的写入性能，减少数据库的压力。但是，由于缓存和数据库之间存在一定的时间差，因此在数据一致性方面需要进行一定的权衡。

**场景：**

适用于写多读少的场景，数据一致性要求不高的场景。

## 缓存穿透

缓存穿透是指用户请求的数据在缓存中不存在即没有命中，同时在数据库中也不存在，导致用户每次请求该数据都要去数据库中查询一遍。如果有恶意攻击者不断请求系统中不存在的数据，会导致短时间大量请求落在数据库上，造成数据库压力过大。

**解决方案：**

- **布隆过滤器**：将所有可能存在的数据哈希到一个足够大的 bitmap 中，一个一定不存在的数据会被这个 bitmap 拦截掉，从而避免了对底层存储系统的查询压力。
- **空值缓存**：当出现 Redis 查不到数据，数据库也查不到数据的情况，我们就把这个 key 保存到 Redis 中，设置 value="null"，并设置其一个较短的过期时间，后面再出现查询这个 key 的请求的时候，直接返回 null，就不需要再查询数据库了。

## 缓存击穿

缓存击穿通常发生在高并发系统中，当某个被频繁访问的数据（热点 key）在缓存中的有效期过了，恰好在这个时候有大量的并发请求需要访问这个数据。由于缓存中的数 据已经失效，这些并发请求就会直接转发到数据库上，如果数据库的处理能力不足以应对这种突然增加的压力，就可能导致系统响应缓慢甚至崩溃。

**解决方案：**

- **互斥锁**：在缓存失效后，通过互斥锁控制读数据写缓存的线程数量，比如某个 key 只允许一个线程查询数据和写缓存，其他线程等待。这种方式会阻塞其他的线程。
- **逻辑过期**：逻辑过期指的是在缓存中设置一个较长的过期时间，但在获取缓存数据时，先进行一次快速的检查，如果发现缓存数据应该已经过期（比如根据某个规则判断数据是否存在），则立即返回一个默认值或者空值，同时异步更新缓存。牺牲了一致性，保证了服务的可用性。

## 缓存雪崩

缓存雪崩是指在同一时间段，大量的缓存 key 同时失效或者 Redis 服务宕机，导致大量请求同时到达数据库，从而给数据库带来非常大的压力。

**解决方案：**

- **过期时间随机**：在设置失效时间的时候加上一个随机值，这样就可以避免了由于使用相同的过期时间导致在某一时刻大量 key 过期引发的缓存雪崩问题。
- **缓存预热**：在系统启动或者数据更新时，预先将热点数据加载到缓存中，避免在高并发时才去加载数据导致缓存失效。
- **redis 集群**：保证 Redis 缓存的高可用，防止 Redis 宕机导致缓存雪崩的问题。可以使用主从+ 哨兵，Redis 集群来避免单个 Redis 服务器宕机导致整个缓存直接失效。
- **多级缓存**：可以将缓存分为多级，如本地缓存、分布式缓存等，不同级别的缓存设置不同的失效时间，当一级缓存失效时，可以尽量从其他级别的缓存中获取数据，减少对数据库的直接访问。
- **限流措施**：在缓存失效后，可以对数据库的访问进行限流，避免大量请求同时访问数据库，可以采用队列等方式进行排队处理。

## 缓存一致性问题

## Redisson

## Redis 消息队列

- 基于 List 消息队列
- 基于 Pub/Sub 消息队列
- 基于 Stream 消息队列

## Redis 持久化

## Redis 集群
