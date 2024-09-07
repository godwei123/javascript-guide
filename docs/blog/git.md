---
create_time: 2024-04-27 22:47:55

timestamp: 2021-07-26 10:00:00
---

# git

## git 常见操作

1. **初始化仓库**：在现有目录中，运行以下命令以将其转化为 Git 仓库：

```bash
git init
```

2. **克隆仓库**：从远程仓库克隆一个副本到本地：

```bash
git clone <远程仓库URL>
```

3. **添加文件**：将文件添加到 Git 仓库，以便跟踪更改：

```bash
git add <文件名>
```

4. **提交更改**：将添加的文件提交到本地仓库，并附带一条描述性的提交消息：

```bash
git commit -m "提交消息"
```

5. **查看状态**：查看当前仓库的文件状态，包括未跟踪、已修改和已暂存的文件：

```bash
git status
```

6. **查看提交历史**：查看提交历史记录，包括提交的作者、日期和消息：

```bash
git log
```

7. **创建分支**：创建新的分支，用于开发新功能或修复 bug：

```bash
git branch <分支名>
```

8. **切换分支**：切换到其他分支：

```bash
git checkout <分支名>
```

9. **合并分支**：将一个分支的更改合并到当前分支：

```bash
git merge <其他分支名>
```

10. **拉取更新**：从远程仓库拉取最新的更改：

```bash
git pull
```

11. **推送更改**：将本地更改推送到远程仓库：

```bash
git push
```

12. **撤销更改**：撤销未提交的更改：

- 撤销工作区中的更改：`git checkout -- <文件名>`
- 撤销已暂存的更改：`git reset HEAD <文件名>`

13. **删除文件**：从 Git 仓库和文件系统中删除文件：

```bash
git rm <文件名>
```

## git rebase & git merge

1. `git merge`：

`git merge` 用于将一个分支的更改合并到当前分支。合并后的历史将保留分支的历史记录，形成一个新的合并提交。这通常用于合并独立开发的功能分支或修复分支到主分支。

```bash
# 切换到目标分支（例如主分支）
git checkout main

# 合并其他分支到当前分支
git merge feature-branch
```

合并示例：

```
    A---B---C (main)
         \
          D---E (feature-branch)

# 执行 git merge feature-branch 后

    A---B---C---F (main)
         \       /
          D---E (feature-branch)
```

2. `git rebase`：

`git rebase` 也用于合并分支，但它执行的是基于某一分支的更改，将它们应用到另一分支上，然后重写历史，使得合并后的历史线更加线性。这通常用于保持一个干净的、直观的提交历史。

```bash
# 切换到要将更改合并到的分支（例如主分支）
git checkout main

# 使用 rebase 将另一个分支（例如功能分支）的更改应用到当前分支
git rebase feature-branch
```

重新基础合并示例：

```
       A---B---C (main)
            \
             D---E (feature-branch)

# 执行 git rebase feature-branch 后

       A---B---C---D---E (main)
```

关键区别：

- `git merge` 会创建一个新的合并提交，保留原始分支的历史记录，但可能导致分支历史变得杂乱。
- `git rebase` 将分支更改应用到目标分支，并重新构建一个线性历史，但会改写提交历史。

选择使用哪种方法取决于您的需求。如果您想保留分支历史，使用 `git merge`。如果您想保持干净、线性的历史，可以使用 `git rebase`，但要注意它可能会导致冲突。

## git stash

`git stash` 是 Git 中一个有用的命令，用于临时保存您的工作目录中的更改，以便您可以切换到其他分支或执行其他任务而不必提交或取消更改。它的主要用途是在工作正在进行中但需要进行其他操作时，临时隐藏或保存当前未提交的更改。

以下是 `git stash` 的一些常见用法和示例：

1. **保存工作目录中的更改**：

```bash
git stash
```

这将保存当前工作目录中的未提交更改并将其存储在一个新的存储区（stash）中。您可以继续执行其他任务，如切换分支，而不用担心这些未提交的更改。

2. **查看 stash 列表**：

```bash
git stash list
```

这将显示存储区中的所有 stash 条目的列表。

3. **应用 stash 中的更改**：

```bash
git stash apply
```

这将应用最新的 stash 中的更改到当前分支，并保留 stash 中的内容。如果您想应用特定 stash，请使用 `git stash apply stash@{n}`，其中 `n` 是 stash 的索引号。

4. **删除 stash 条目**：

```bash
git stash drop
```

这将删除最新的 stash 条目。如果您想删除特定 stash，请使用 `git stash drop stash@{n}`。

5. **应用并删除 stash 中的更改**：

```bash
git stash pop
```

这将应用并删除最新的 stash 条目。

6. **清空所有 stash 条目**：

```bash
git stash clear
```

这将清空所有 stash 条目，慎用，因为它会永久删除所有 stash 内容。

`git stash` 对于在处理多个任务时暂存当前任务的更改非常有用。您可以在切换分支、修复 bug 或处理其他任务时使用它，然后随时返回并应用之前的更改。

## git checkout

`git checkout` 是 Git 中的一个重要命令，它用于在不同的分支之间切换、查看历史版本或恢复文件。`git checkout` 具有多种用法，具体取决于您希望执行的操作。以下是一些常见的用法：

1. **切换分支**：

- 用于切换到已存在的分支，例如，从主分支切换到功能分支。

```bash
git checkout branch-name
```

2. **创建并切换分支**：

- 用于创建一个新分支并立即切换到该分支。

```bash
git checkout -b new-branch
```

3. **查看历史版本**：

- 用于查看历史提交的内容，可以提供提交的哈希值或分支名。

```bash
git checkout commit-hash
```

4. **检出单个文件**：

- 用于恢复单个文件到特定提交的状态。

```bash
git checkout commit-hash -- file-name
```

5. **切换回上一个分支**：

- 用于返回到之前的分支，通常与 `git checkout -b` 配合使用。

```bash
git checkout -
```

6. **创建分离头状态**：

- 用于查看历史提交而不在分支上工作，这将创建一个分离头状态。

```bash
git checkout commit-hash
```

7. **切换回最新提交**：

- 用于将分支恢复到最新提交的状态。

```bash
git checkout HEAD
```

8. **切换到标签**：

- 用于切换到特定的标签。

```bash
git checkout tag-name
```

请注意，`git checkout` 在不同的上下文中有不同的用法，因此确保在使用时了解您希望执行的操作。这些命令可以帮助您在 Git 中导航、管理分支和版本历史，以及恢复文件。

## git 可视化工具

- GitHub Desktop
- fork
- Sourcetree
- IDEA
