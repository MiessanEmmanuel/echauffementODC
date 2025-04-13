# 📡 API Laravel – Ordinateurs & Catégories

Bienvenue dans l’API Laravel permettant la gestion de **catégories** et **ordinateurs**. Cette API suit les principes RESTful.

## 🌐 Base URL

```
http://<votre-domaine-ou-localhost>/api
```

---

## 📁 Endpoints

### 🔹 Catégories

#### ✅ GET `/categories`

- **Description** : Liste toutes les catégories.

**Réponse :**
```json
{
  "categories": [
    {
      "id": 1,
      "nom": "Portable"
    },
    {
      "id": 2,
      "nom": "Bureau"
    }
  ]
}
```

---

#### ✅ POST `/categories`

- **Description** : Crée une nouvelle catégorie.
- **Body (JSON)** :
```json
{
  "nom": "Portable"
}
```

**Réponse :**
```json
{
  "category": {
    "id": 3,
    "nom": "Portable"
  }
}
```

---

#### ✅ PUT `/categories/{id}`

- **Description** : Met à jour une catégorie existante.
- **Body (JSON)** :
```json
{
  "nom": "Catégorie mise à jour"
}
```

**Réponse :**
```json
{
  "category": {
    "id": 3,
    "nom": "Catégorie mise à jour"
  }
}
```

---

#### ✅ DELETE `/categories/{id}`

- **Description** : Supprime une catégorie existante.

**Réponse :**
```json
{
  "message": "Category deleted successfully"
}
```

---

### 💻 Ordinateurs

#### ✅ GET `/ordinateurs`

- **Description** : Liste tous les ordinateurs (avec leurs catégories associées).

**Réponse :**
```json
{
  "ordinateurs": [
    {
      "id": 1,
      "nom": "MacBook Pro",
      "annee": 2021,
      "sizeScreen": 15,
      "price": 2000,
      "category": {
        "id": 1,
        "nom": "Portable"
      }
    }
  ]
}
```

---

#### ✅ POST `/ordinateurs`

- **Description** : Crée un nouvel ordinateur.
- **Body (JSON)** :
```json
{
  "nom": "MacBook Pro",
  "annee": 2021,
  "sizeScreen": 15,
  "price": 2000,
  "category_id": 1
}
```

**Réponse :**
```json
{
  "ordinateur": {
    "id": 2,
    "nom": "MacBook Pro",
    "annee": 2021,
    "sizeScreen": 15,
    "price": 2000,
    "category_id": 1
  }
}
```

---

#### ✅ PUT `/ordinateurs/{id}`

- **Description** : Met à jour un ordinateur existant.
- **Body (JSON)** :
```json
{
  "nom": "Dell XPS",
  "annee": 2022,
  "sizeScreen": 13,
  "price": 1500,
  "category_id": 2
}
```

**Réponse :**
```json
{
  "ordinateur": {
    "id": 2,
    "nom": "Dell XPS",
    "annee": 2022,
    "sizeScreen": 13,
    "price": 1500,
    "category_id": 2
  }
}
```

---

#### ✅ DELETE `/ordinateurs/{id}`

- **Description** : Supprime un ordinateur existant.

**Réponse :**
```json
{
  "message": "Ordinateur deleted successfully"
}
```

---

## 🔐 Authentification

> ℹ️ L’API n’est actuellement pas protégée par un système d’authentification.  
> Si besoin, ajoutez `auth:sanctum` ou une autre solution d'authentification dans vos routes.

---

## 📦 Format attendu des données

Assurez-vous que toutes les requêtes POST/PUT utilisent l’en-tête suivant :

```
Content-Type: application/json
```

---

## 🚀 Démarrer le projet localement

```bash
git clone <url-du-depot>
cd <nom-du-projet>
composer install
php artisan migrate --seed
php artisan serve
```
