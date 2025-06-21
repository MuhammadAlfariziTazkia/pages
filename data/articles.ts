export interface Article {
  id: string
  title: {
    en: string
    ja: string
  }
  description: {
    en: string
    ja: string
  }
  content: {
    en: string
    ja: string
  }
  thumbnail: string
  author: string
  publishedDate: string
  category: string
  readTime: number
}

export interface ArticleCategory {
  id: string
  name: {
    en: string
    ja: string
  }
  description: {
    en: string
    ja: string
  }
  icon: string
  color: string
  articleCount: number
}

export const articleCategories: ArticleCategory[] = [
  {
    id: "programming-languages",
    name: {
      en: "Programming Languages",
      ja: "プログラミング言語",
    },
    description: {
      en: "Deep dives into various programming languages, syntax, and best practices",
      ja: "様々なプログラミング言語、構文、ベストプラクティスの詳細解説",
    },
    icon: "💻",
    color: "bg-blue-500",
    articleCount: 12,
  },
  {
    id: "machine-learning",
    name: {
      en: "Machine Learning",
      ja: "機械学習",
    },
    description: {
      en: "AI/ML algorithms, frameworks, and real-world applications",
      ja: "AI/MLアルゴリズム、フレームワーク、実世界での応用",
    },
    icon: "🤖",
    color: "bg-green-500",
    articleCount: 8,
  },
  {
    id: "backend-development",
    name: {
      en: "Backend Development",
      ja: "バックエンド開発",
    },
    description: {
      en: "Server-side development, APIs, databases, and system architecture",
      ja: "サーバーサイド開発、API、データベース、システムアーキテクチャ",
    },
    icon: "⚙️",
    color: "bg-purple-500",
    articleCount: 15,
  },
  {
    id: "web-development",
    name: {
      en: "Web Development",
      ja: "ウェブ開発",
    },
    description: {
      en: "Frontend and fullstack web development techniques and frameworks",
      ja: "フロントエンドとフルスタックウェブ開発技術とフレームワーク",
    },
    icon: "🌐",
    color: "bg-cyan-500",
    articleCount: 10,
  },
  {
    id: "database",
    name: {
      en: "Database",
      ja: "データベース",
    },
    description: {
      en: "Database design, optimization, and management strategies",
      ja: "データベース設計、最適化、管理戦略",
    },
    icon: "🗄️",
    color: "bg-orange-500",
    articleCount: 7,
  },
  {
    id: "devops",
    name: {
      en: "DevOps",
      ja: "DevOps",
    },
    description: {
      en: "CI/CD, containerization, cloud deployment, and infrastructure",
      ja: "CI/CD、コンテナ化、クラウドデプロイメント、インフラストラクチャ",
    },
    icon: "🚀",
    color: "bg-red-500",
    articleCount: 6,
  },
]

export const articles: Article[] = [
  {
    id: "java-spring-boot-best-practices",
    title: {
      en: "Java Spring Boot Best Practices for Enterprise Applications",
      ja: "エンタープライズアプリケーションのためのJava Spring Bootベストプラクティス",
    },
    description: {
      en: "Learn essential Spring Boot patterns and practices for building scalable enterprise applications with proper architecture and security.",
      ja: "適切なアーキテクチャとセキュリティを備えたスケーラブルなエンタープライズアプリケーションを構築するための重要なSpring Bootパターンとプラクティスを学びます。",
    },
    content: {
      en: `# Java Spring Boot Best Practices for Enterprise Applications

## Introduction

Spring Boot has revolutionized Java enterprise development by providing a convention-over-configuration approach that significantly reduces boilerplate code and setup time. In this comprehensive guide, we'll explore the best practices for building robust, scalable enterprise applications using Spring Boot.

## 1. Project Structure and Organization

### Recommended Package Structure
\`\`\`
com.company.application
├── config/          # Configuration classes
├── controller/      # REST controllers
├── service/         # Business logic
├── repository/      # Data access layer
├── model/          # Entity classes
├── dto/            # Data Transfer Objects
├── exception/      # Custom exceptions
└── util/           # Utility classes
\`\`\`

### Key Benefits:
- Clear separation of concerns
- Easy navigation and maintenance
- Follows Spring Boot conventions

## 2. Configuration Management

### Use Application Properties Effectively
\`\`\`yaml
# application.yml
spring:
  profiles:
    active: dev
  datasource:
    url: \${DB_URL:jdbc:postgresql://localhost:5432/mydb}
    username: \${DB_USERNAME:admin}
    password: \${DB_PASSWORD:password}
\`\`\`

### Environment-Specific Configurations
- \`application-dev.yml\` for development
- \`application-prod.yml\` for production
- \`application-test.yml\` for testing

## 3. Security Best Practices

### Implement Proper Authentication
\`\`\`java
@Configuration
@EnableWebSecurity
public class SecurityConfig {
    
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .authorizeHttpRequests(authz -> authz
                .requestMatchers("/api/public/**").permitAll()
                .anyRequest().authenticated()
            )
            .oauth2ResourceServer(OAuth2ResourceServerConfigurer::jwt);
        return http.build();
    }
}
\`\`\`

## 4. Database Integration

### Use JPA Repositories Effectively
\`\`\`java
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    
    @Query("SELECT u FROM User u WHERE u.email = :email")
    Optional<User> findByEmail(@Param("email") String email);
    
    @Modifying
    @Query("UPDATE User u SET u.lastLogin = :loginTime WHERE u.id = :userId")
    void updateLastLogin(@Param("userId") Long userId, @Param("loginTime") LocalDateTime loginTime);
}
\`\`\`

## 5. Error Handling

### Global Exception Handler
\`\`\`java
@ControllerAdvice
public class GlobalExceptionHandler {
    
    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleEntityNotFound(EntityNotFoundException ex) {
        ErrorResponse error = new ErrorResponse("ENTITY_NOT_FOUND", ex.getMessage());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
    }
}
\`\`\`

## Conclusion

Following these best practices will help you build maintainable, scalable, and secure Spring Boot applications. Remember to always consider your specific use case and adapt these practices accordingly.`,
      ja: `# エンタープライズアプリケーションのためのJava Spring Bootベストプラクティス

## はじめに

Spring Bootは、設定よりも規約のアプローチを提供することで、Javaエンタープライズ開発に革命をもたらし、ボイラープレートコードとセットアップ時間を大幅に削減しました。この包括的なガイドでは、Spring Bootを使用して堅牢でスケーラブルなエンタープライズアプリケーションを構築するためのベストプラクティスを探ります。

## 1. プロジェクト構造と組織

### 推奨パッケージ構造
\`\`\`
com.company.application
├── config/          # 設定クラス
├── controller/      # RESTコントローラー
├── service/         # ビジネスロジック
├── repository/      # データアクセス層
├── model/          # エンティティクラス
├── dto/            # データ転送オブジェクト
├── exception/      # カスタム例外
└── util/           # ユーティリティクラス
\`\`\`

### 主な利点：
- 関心の明確な分離
- 簡単なナビゲーションとメンテナンス
- Spring Boot規約に従う

## 2. 設定管理

### アプリケーションプロパティの効果的な使用
\`\`\`yaml
# application.yml
spring:
  profiles:
    active: dev
  datasource:
    url: \${DB_URL:jdbc:postgresql://localhost:5432/mydb}
    username: \${DB_USERNAME:admin}
    password: \${DB_PASSWORD:password}
\`\`\`

### 環境固有の設定
- 開発用の\`application-dev.yml\`
- 本番用の\`application-prod.yml\`
- テスト用の\`application-test.yml\`

## 3. セキュリティのベストプラクティス

### 適切な認証の実装
\`\`\`java
@Configuration
@EnableWebSecurity
public class SecurityConfig {
    
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .authorizeHttpRequests(authz -> authz
                .requestMatchers("/api/public/**").permitAll()
                .anyRequest().authenticated()
            )
            .oauth2ResourceServer(OAuth2ResourceServerConfigurer::jwt);
        return http.build();
    }
}
\`\`\`

## 4. データベース統合

### JPAリポジトリの効果的な使用
\`\`\`java
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    
    @Query("SELECT u FROM User u WHERE u.email = :email")
    Optional<User> findByEmail(@Param("email") String email);
    
    @Modifying
    @Query("UPDATE User u SET u.lastLogin = :loginTime WHERE u.id = :userId")
    void updateLastLogin(@Param("userId") Long userId, @Param("loginTime") LocalDateTime loginTime);
}
\`\`\`

## 5. エラーハンドリング

### グローバル例外ハンドラー
\`\`\`java
@ControllerAdvice
public class GlobalExceptionHandler {
    
    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleEntityNotFound(EntityNotFoundException ex) {
        ErrorResponse error = new ErrorResponse("ENTITY_NOT_FOUND", ex.getMessage());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
    }
}
\`\`\`

## 結論

これらのベストプラクティスに従うことで、保守可能で、スケーラブルで、安全なSpring Bootアプリケーションを構築できます。常に特定のユースケースを考慮し、これらのプラクティスを適切に適応させることを忘れないでください。`,
    },
    thumbnail: "/placeholder.svg?height=200&width=300",
    author: "Muhammad Alfarizi Tazkia",
    publishedDate: "2024-01-15",
    category: "programming-languages",
    readTime: 8,
  },
  {
    id: "machine-learning-tensorflow-guide",
    title: {
      en: "Getting Started with TensorFlow for Machine Learning",
      ja: "機械学習のためのTensorFlow入門ガイド",
    },
    description: {
      en: "A comprehensive guide to building your first machine learning models with TensorFlow, covering basics to advanced techniques.",
      ja: "TensorFlowを使用した初めての機械学習モデル構築の包括的なガイド。基礎から高度な技術まで網羅。",
    },
    content: {
      en: `# Getting Started with TensorFlow for Machine Learning

## Introduction

TensorFlow is one of the most popular open-source machine learning frameworks developed by Google. This guide will walk you through the fundamentals of TensorFlow and help you build your first machine learning models.

## What is TensorFlow?

TensorFlow is an end-to-end open-source platform for machine learning. It has a comprehensive, flexible ecosystem of tools, libraries, and community resources that lets researchers push the state-of-the-art in ML and developers easily build and deploy ML-powered applications.

## Installation

### Using pip
\`\`\`bash
pip install tensorflow
\`\`\`

### Using conda
\`\`\`bash
conda install tensorflow
\`\`\`

## Your First TensorFlow Program

\`\`\`python
import tensorflow as tf
import numpy as np

# Create a simple linear model
model = tf.keras.Sequential([
    tf.keras.layers.Dense(1, input_shape=[1])
])

# Compile the model
model.compile(optimizer='sgd', loss='mean_squared_error')

# Training data
xs = np.array([-1.0, 0.0, 1.0, 2.0, 3.0, 4.0], dtype=float)
ys = np.array([-3.0, -1.0, 1.0, 3.0, 5.0, 7.0], dtype=float)

# Train the model
model.fit(xs, ys, epochs=500)

# Make a prediction
print(model.predict([10.0]))
\`\`\`

## Key Concepts

### 1. Tensors
Tensors are the fundamental data structure in TensorFlow. They are multi-dimensional arrays with a uniform type.

### 2. Operations
Operations (ops) are nodes in the computational graph that perform computations on tensors.

### 3. Graphs
A computational graph is a series of TensorFlow operations arranged into a graph of nodes.

## Building a Neural Network

\`\`\`python
import tensorflow as tf
from tensorflow import keras

# Load and prepare the MNIST dataset
(x_train, y_train), (x_test, y_test) = keras.datasets.mnist.load_data()
x_train, x_test = x_train / 255.0, x_test / 255.0

# Build the model
model = keras.Sequential([
    keras.layers.Flatten(input_shape=(28, 28)),
    keras.layers.Dense(128, activation='relu'),
    keras.layers.Dropout(0.2),
    keras.layers.Dense(10, activation='softmax')
])

# Compile the model
model.compile(optimizer='adam',
              loss='sparse_categorical_crossentropy',
              metrics=['accuracy'])

# Train the model
model.fit(x_train, y_train, epochs=5)

# Evaluate the model
model.evaluate(x_test, y_test, verbose=2)
\`\`\`

## Best Practices

1. **Data Preprocessing**: Always normalize your data
2. **Model Validation**: Use validation sets to monitor overfitting
3. **Regularization**: Apply dropout and other regularization techniques
4. **Monitoring**: Use TensorBoard for visualization
5. **Checkpointing**: Save model checkpoints during training

## Conclusion

TensorFlow provides a powerful platform for building machine learning models. Start with simple examples and gradually work your way up to more complex architectures. Practice is key to mastering machine learning with TensorFlow.`,
      ja: `# 機械学習のためのTensorFlow入門ガイド

## はじめに

TensorFlowは、Googleによって開発された最も人気のあるオープンソース機械学習フレームワークの一つです。このガイドでは、TensorFlowの基礎を説明し、初めての機械学習モデルの構築をお手伝いします。

## TensorFlowとは？

TensorFlowは、機械学習のためのエンドツーエンドのオープンソースプラットフォームです。研究者がMLの最先端を押し進め、開発者がMLを活用したアプリケーションを簡単に構築・デプロイできるよう、包括的で柔軟なツール、ライブラリ、コミュニティリソースのエコシステムを提供しています。

## インストール

### pipを使用
\`\`\`bash
pip install tensorflow
\`\`\`

### condaを使用
\`\`\`bash
conda install tensorflow
\`\`\`

## 初めてのTensorFlowプログラム

\`\`\`python
import tensorflow as tf
import numpy as np

# シンプルな線形モデルを作成
model = tf.keras.Sequential([
    tf.keras.layers.Dense(1, input_shape=[1])
])

# モデルをコンパイル
model.compile(optimizer='sgd', loss='mean_squared_error')

# 訓練データ
xs = np.array([-1.0, 0.0, 1.0, 2.0, 3.0, 4.0], dtype=float)
ys = np.array([-3.0, -1.0, 1.0, 3.0, 5.0, 7.0], dtype=float)

# モデルを訓練
model.fit(xs, ys, epochs=500)

# 予測を行う
print(model.predict([10.0]))
\`\`\`

## 主要概念

### 1. テンソル
テンソルは、TensorFlowの基本的なデータ構造です。統一された型を持つ多次元配列です。

### 2. 演算
演算（ops）は、テンソルに対して計算を実行する計算グラフのノードです。

### 3. グラフ
計算グラフは、ノードのグラフに配置されたTensorFlow演算の系列です。

## ニューラルネットワークの構築

\`\`\`python
import tensorflow as tf
from tensorflow import keras

# MNISTデータセットを読み込み、準備
(x_train, y_train), (x_test, y_test) = keras.datasets.mnist.load_data()
x_train, x_test = x_train / 255.0, x_test / 255.0

# モデルを構築
model = keras.Sequential([
    keras.layers.Flatten(input_shape=(28, 28)),
    keras.layers.Dense(128, activation='relu'),
    keras.layers.Dropout(0.2),
    keras.layers.Dense(10, activation='softmax')
])

# モデルをコンパイル
model.compile(optimizer='adam',
              loss='sparse_categorical_crossentropy',
              metrics=['accuracy'])

# モデルを訓練
model.fit(x_train, y_train, epochs=5)

# モデルを評価
model.evaluate(x_test, y_test, verbose=2)
\`\`\`

## ベストプラクティス

1. **データ前処理**: 常にデータを正規化する
2. **モデル検証**: 過学習を監視するために検証セットを使用する
3. **正則化**: ドロップアウトやその他の正則化技術を適用する
4. **監視**: 可視化にTensorBoardを使用する
5. **チェックポイント**: 訓練中にモデルのチェックポイントを保存する

## 結論

TensorFlowは機械学習モデルを構築するための強力なプラットフォームを提供します。シンプルな例から始めて、徐々により複雑なアーキテクチャに取り組んでください。TensorFlowを使った機械学習をマスターするには練習が鍵です。`,
    },
    thumbnail: "/placeholder.svg?height=200&width=300",
    author: "Muhammad Alfarizi Tazkia",
    publishedDate: "2024-01-10",
    category: "machine-learning",
    readTime: 12,
  },
  {
    id: "postgresql-optimization-guide",
    title: {
      en: "PostgreSQL Performance Optimization Techniques",
      ja: "PostgreSQLパフォーマンス最適化テクニック",
    },
    description: {
      en: "Learn advanced PostgreSQL optimization techniques including indexing strategies, query optimization, and database tuning.",
      ja: "インデックス戦略、クエリ最適化、データベースチューニングを含む高度なPostgreSQL最適化技術を学びます。",
    },
    content: {
      en: `# PostgreSQL Performance Optimization Techniques

## Introduction

PostgreSQL is a powerful, open-source relational database system. However, as your application grows, you may encounter performance bottlenecks. This guide covers essential optimization techniques to keep your PostgreSQL database running smoothly.

## 1. Understanding Query Performance

### Using EXPLAIN and EXPLAIN ANALYZE

\`\`\`sql
-- Basic query plan
EXPLAIN SELECT * FROM users WHERE email = 'user@example.com';

-- Detailed execution statistics
EXPLAIN ANALYZE SELECT * FROM users WHERE email = 'user@example.com';
\`\`\`

### Reading Query Plans
- **Seq Scan**: Sequential scan through entire table
- **Index Scan**: Using an index to find rows
- **Nested Loop**: Join algorithm for small datasets
- **Hash Join**: Efficient for larger datasets

## 2. Indexing Strategies

### B-tree Indexes (Default)
\`\`\`sql
-- Single column index
CREATE INDEX idx_users_email ON users(email);

-- Composite index
CREATE INDEX idx_users_name_age ON users(last_name, first_name, age);
\`\`\`

### Partial Indexes
\`\`\`sql
-- Index only active users
CREATE INDEX idx_active_users ON users(email) WHERE status = 'active';
\`\`\`

### Expression Indexes
\`\`\`sql
-- Index on function result
CREATE INDEX idx_users_lower_email ON users(LOWER(email));
\`\`\`

## 3. Query Optimization

### Avoid SELECT *
\`\`\`sql
-- Bad
SELECT * FROM users WHERE id = 1;

-- Good
SELECT id, email, first_name FROM users WHERE id = 1;
\`\`\`

### Use LIMIT for Large Result Sets
\`\`\`sql
-- Pagination
SELECT id, email FROM users ORDER BY created_at DESC LIMIT 20 OFFSET 40;
\`\`\`

### Optimize JOINs
\`\`\`sql
-- Use appropriate JOIN types
SELECT u.email, p.title 
FROM users u 
INNER JOIN posts p ON u.id = p.user_id 
WHERE u.status = 'active';
\`\`\`

## 4. Database Configuration

### Memory Settings
\`\`\`
# postgresql.conf
shared_buffers = 256MB          # 25% of RAM
effective_cache_size = 1GB      # 75% of RAM
work_mem = 4MB                  # Per operation
maintenance_work_mem = 64MB     # For maintenance operations
\`\`\`

### Connection Settings
\`\`\`
max_connections = 100           # Adjust based on your needs
\`\`\`

## 5. Monitoring and Maintenance

### Regular VACUUM and ANALYZE
\`\`\`sql
-- Manual vacuum
VACUUM ANALYZE users;

-- Enable autovacuum (recommended)
-- In postgresql.conf:
-- autovacuum = on
\`\`\`

### Monitor Slow Queries
\`\`\`
# postgresql.conf
log_min_duration_statement = 1000  # Log queries taking > 1 second
\`\`\`

### Check Index Usage
\`\`\`sql
SELECT 
    schemaname,
    tablename,
    indexname,
    idx_scan,
    idx_tup_read,
    idx_tup_fetch
FROM pg_stat_user_indexes
ORDER BY idx_scan DESC;
\`\`\`

## 6. Advanced Techniques

### Partitioning
\`\`\`sql
-- Range partitioning by date
CREATE TABLE sales (
    id SERIAL,
    sale_date DATE,
    amount DECIMAL
) PARTITION BY RANGE (sale_date);

CREATE TABLE sales_2024_q1 PARTITION OF sales
FOR VALUES FROM ('2024-01-01') TO ('2024-04-01');
\`\`\`

### Connection Pooling
Use tools like PgBouncer to manage database connections efficiently.

## Conclusion

PostgreSQL optimization is an ongoing process. Regular monitoring, proper indexing, and query optimization are key to maintaining good performance. Always test changes in a development environment before applying them to production.`,
      ja: `# PostgreSQLパフォーマンス最適化テクニック

## はじめに

PostgreSQLは強力なオープンソースリレーショナルデータベースシステムです。しかし、アプリケーションが成長するにつれて、パフォーマンスのボトルネックに遭遇する可能性があります。このガイドでは、PostgreSQLデータベースをスムーズに動作させるための重要な最適化技術を説明します。

## 1. クエリパフォーマンスの理解

### EXPLAINとEXPLAIN ANALYZEの使用

\`\`\`sql
-- 基本的なクエリプラン
EXPLAIN SELECT * FROM users WHERE email = 'user@example.com';

-- 詳細な実行統計
EXPLAIN ANALYZE SELECT * FROM users WHERE email = 'user@example.com';
\`\`\`

### クエリプランの読み方
- **Seq Scan**: テーブル全体の順次スキャン
- **Index Scan**: インデックスを使用した行の検索
- **Nested Loop**: 小さなデータセット用の結合アルゴリズム
- **Hash Join**: 大きなデータセットに効率的

## 2. インデックス戦略

### B-treeインデックス（デフォルト）
\`\`\`sql
-- 単一列インデックス
CREATE INDEX idx_users_email ON users(email);

-- 複合インデックス
CREATE INDEX idx_users_name_age ON users(last_name, first_name, age);
\`\`\`

### 部分インデックス
\`\`\`sql
-- アクティブユーザーのみのインデックス
CREATE INDEX idx_active_users ON users(email) WHERE status = 'active';
\`\`\`

### 式インデックス
\`\`\`sql
-- 関数結果のインデックス
CREATE INDEX idx_users_lower_email ON users(LOWER(email));
\`\`\`

## 3. クエリ最適化

### SELECT *を避ける
\`\`\`sql
-- 悪い例
SELECT * FROM users WHERE id = 1;

-- 良い例
SELECT id, email, first_name FROM users WHERE id = 1;
\`\`\`

### 大きな結果セットにはLIMITを使用
\`\`\`sql
-- ページネーション
SELECT id, email FROM users ORDER BY created_at DESC LIMIT 20 OFFSET 40;
\`\`\`

### JOINの最適化
\`\`\`sql
-- 適切なJOINタイプを使用
SELECT u.email, p.title 
FROM users u 
INNER JOIN posts p ON u.id = p.user_id 
WHERE u.status = 'active';
\`\`\`

## 4. データベース設定

### メモリ設定
\`\`\`
# postgresql.conf
shared_buffers = 256MB          # RAMの25%
effective_cache_size = 1GB      # RAMの75%
work_mem = 4MB                  # 操作ごと
maintenance_work_mem = 64MB     # メンテナンス操作用
\`\`\`

### 接続設定
\`\`\`
max_connections = 100           # ニーズに応じて調整
\`\`\`

## 5. 監視とメンテナンス

### 定期的なVACUUMとANALYZE
\`\`\`sql
-- 手動バキューム
VACUUM ANALYZE users;

-- 自動バキュームを有効化（推奨）
-- postgresql.confで:
-- autovacuum = on
\`\`\`

### 遅いクエリの監視
\`\`\`
# postgresql.conf
log_min_duration_statement = 1000  # 1秒以上かかるクエリをログ
\`\`\`

### インデックス使用状況の確認
\`\`\`sql
SELECT 
    schemaname,
    tablename,
    indexname,
    idx_scan,
    idx_tup_read,
    idx_tup_fetch
FROM pg_stat_user_indexes
ORDER BY idx_scan DESC;
\`\`\`

## 6. 高度な技術

### パーティショニング
\`\`\`sql
-- 日付による範囲パーティショニング
CREATE TABLE sales (
    id SERIAL,
    sale_date DATE,
    amount DECIMAL
) PARTITION BY RANGE (sale_date);

CREATE TABLE sales_2024_q1 PARTITION OF sales
FOR VALUES FROM ('2024-01-01') TO ('2024-04-01');
\`\`\`

### コネクションプーリング
PgBouncerなどのツールを使用してデータベース接続を効率的に管理します。

## 結論

PostgreSQLの最適化は継続的なプロセスです。定期的な監視、適切なインデックス作成、クエリ最適化が良好なパフォーマンスを維持する鍵です。本番環境に適用する前に、必ず開発環境で変更をテストしてください。`,
    },
    thumbnail: "/placeholder.svg?height=200&width=300",
    author: "Muhammad Alfarizi Tazkia",
    publishedDate: "2024-01-05",
    category: "database",
    readTime: 10,
  },
]

export function getArticlesByCategory(categoryId: string): Article[] {
  return articles.filter((article) => article.category === categoryId)
}

export function getArticleById(id: string): Article | undefined {
  return articles.find((article) => article.id === id)
}
