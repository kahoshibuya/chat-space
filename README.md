# chat-space



## userテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false, add_index: true|

### Association
- has_many :members
- has_many :groups, through: :members
- has_many :messages


## groupテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false|

### Association
- has_many :members
- has_many :users, through: :members
- has_many :messages


## membersテーブル（中間テーブル）

|Column|Type|Options|
|------|----|-------|
|user_id|references|null: false, foreign_key: true|
|group_id|references|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user

## messageテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|references|null: false, foreign_key: true|
|group_id|references|null: false, foreign_key: true|
|body|text|
|image|string| 

### Association
- belongs_to :group
- belongs_to :user