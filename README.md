# chat-space



## userテーブル
|Column|Type|Options|
|------|----|-------|
|name|varcher|null: false|
|e-mail|varcher|null: false, unique: true|
|password|varcher|null: false|

### Association
- has_many :members
- has_many :groups, through: :members
- has_many :massage, through: :members


## groupテーブル
|Column|Type|Options|
|------|----|-------|
|group_id|integer|null: false, unique: true|
|groupe_name|varcher|null: false|

### Association
- has_many :members
- has_many :users, through: :members
- has_many :massage, through: :members


## membersテーブル（中間テーブル）

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user
- has_many :massages

## massageテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
|body|text|null: false｜
|image|string| 

### Association
- belongs_to :group, through: :mambers
- belongs_to :user, through: :members