# Admin Dashboard Implementation Plan

## Overview
Building a custom admin dashboard integrated into the existing Vue 3 frontend with full RBAC support.

## Architecture

```
src/
├── entities/admin/              # Admin-specific entities
│   ├── api/                     # RBAC API calls
│   │   ├── get-permissions.ts
│   │   ├── assign-role.ts
│   │   ├── remove-role.ts
│   │   └── index.ts
│   ├── model/                   # Admin types & composables
│   │   ├── admin.types.ts
│   │   ├── use-admin-check.ts  # Composable for checking admin status
│   │   └── index.ts
│   ├── ui/                      # Reusable admin components
│   │   ├── AdminGuard.vue      # Route protection component
│   │   └── index.ts
│   └── index.ts
│
├── pages/admin/                 # Admin pages
│   ├── dashboard/
│   │   ├── AdminDashboard.vue  # Main dashboard
│   │   └── index.ts
│   ├── users/
│   │   ├── UserList.vue        # User management
│   │   ├── UserEdit.vue
│   │   └── index.ts
│   ├── decks/
│   │   ├── DeckList.vue        # Deck management
│   │   └── index.ts
│   ├── flashcards/
│   │   ├── FlashcardList.vue   # Flashcard management
│   │   └── index.ts
│   ├── resources/
│   │   ├── ResourceList.vue    # Educational resources
│   │   └── index.ts
│   ├── tags/
│   │   ├── TagList.vue         # Tag management
│   │   └── index.ts
│   ├── feedback/
│   │   ├── FeedbackList.vue    # Feedback management
│   │   └── index.ts
│   └── index.ts
│
└── app/router/
    └── routes.ts               # Add admin routes
```

## Implementation Steps

### Phase 1: RBAC Integration (30 min)
1. Create admin API services
   - `get-my-permissions.ts` - Get current user permissions
   - `get-user-permissions.ts` - Get specific user permissions (admin only)
   - `assign-role.ts` - Assign role to user (admin only)
   - `remove-role.ts` - Remove role from user (admin only)

2. Create admin composables
   - `use-admin-check.ts` - Check if user is admin
   - `use-permissions.ts` - Access user permissions

3. Update Viewer type to include roles/permissions

### Phase 2: Admin Guard & Navigation (30 min)
1. Create `AdminGuard.vue` component
2. Add admin routes to router
3. Update navigation guard for admin routes
4. Create admin layout/sidebar

### Phase 3: Admin Dashboard (30 min)
1. Create main dashboard page
   - Statistics cards (users, decks, flashcards)
   - Recent activity
   - Quick actions

### Phase 4: User Management (1 hour)
1. User List page
   - Table with search, filter, sort
   - Pagination
   - Role badges
   - Actions (edit, delete, assign role)

2. User Edit modal/page
   - Edit username, email
   - Assign/remove roles
   - Delete user

### Phase 5: Content Management (2 hours)
1. Deck Management
   - List all decks
   - Filter by user, public/private
   - Edit/delete decks

2. Flashcard Management
   - List all flashcards
   - Filter by deck
   - Edit/delete flashcards

3. Educational Resource Management
   - List resources
   - Delete resources

4. Tag Management
   - CRUD operations for tags

5. Feedback Management
   - View feedback
   - Delete inappropriate feedback

### Phase 6: UI Components (1 hour)
1. Admin table component
2. Admin modal component
3. Admin form components
4. Statistics cards
5. Action buttons

## Features by Page

### Admin Dashboard
- Total users count
- Total decks count
- Total flashcards count
- Recent user registrations
- Recent deck creations
- System health indicators

### User Management
- List all users with pagination
- Search by username/email
- Filter by role
- View user details (decks, resources, activity)
- Assign/remove roles
- Delete users
- Reset passwords (future)

### Deck Management
- List all decks
- Filter by owner, public/private status
- View deck statistics
- Edit deck details
- Delete decks
- View flashcards in deck

### Flashcard Management
- List all flashcards
- Filter by deck
- View SR parameters
- Edit front/back content
- Delete flashcards

### Resource Management
- List all educational resources
- View file details
- Delete resources

### Tag Management
- List all tags
- Create new tags
- Edit tag name/color
- Delete tags
- View decks using each tag

### Feedback Management
- List all feedback
- Filter by deck/rating
- View feedback content
- Delete inappropriate feedback

## API Endpoints Required

### RBAC Endpoints (already exist)
- `GET /rbac/me/permissions` - Get my permissions
- `GET /rbac/users/:userId/permissions` - Get user permissions
- `POST /rbac/users/:userId/roles` - Assign role
- `DELETE /rbac/users/:userId/roles/:roleName` - Remove role

### Admin User Endpoints (need to create)
- `GET /admin/users` - List all users
- `GET /admin/users/:id` - Get user details
- `PUT /admin/users/:id` - Update user
- `DELETE /admin/users/:id` - Delete user

### Admin Deck Endpoints (need to create)
- `GET /admin/decks` - List all decks
- `DELETE /admin/decks/:id` - Delete any deck

### Admin Flashcard Endpoints (need to create)
- `GET /admin/flashcards` - List all flashcards
- `PUT /admin/flashcards/:id` - Edit flashcard
- `DELETE /admin/flashcards/:id` - Delete flashcard

### Statistics Endpoints (need to create)
- `GET /admin/statistics` - Get system statistics

## UI/UX Guidelines

### Color Scheme
- Use existing app theme
- Admin-specific accent color (e.g., amber/orange for admin mode)
- Danger red for destructive actions

### Layout
- Sidebar navigation for admin section
- Breadcrumbs for navigation context
- Admin badge/indicator in navbar

### Components
- Reuse existing UI components where possible
- Create admin-specific table component
- Modal dialogs for edit/delete confirmations

### Responsive Design
- Desktop-first (admin typically used on desktop)
- Mobile-friendly tables (horizontal scroll)

## Security Considerations

1. **Frontend Guards**
   - Check admin role before rendering admin routes
   - Redirect non-admins to home page

2. **Backend Protection**
   - All admin endpoints protected with `@RequiresRole('admin')`
   - Double-check permissions on all mutations

3. **UI Indicators**
   - Clear indication when in admin mode
   - Confirmation dialogs for destructive actions

## Testing Credentials

```
Admin User:
Email: aleksandr@example.com
Password: password123

Regular User:
Email: student@education.com
Password: password123
```

## Timeline

| Phase | Task | Time | Total |
|-------|------|------|-------|
| 1 | RBAC Integration | 30 min | 30 min |
| 2 | Admin Guard & Navigation | 30 min | 1 hour |
| 3 | Admin Dashboard | 30 min | 1.5 hours |
| 4 | User Management | 1 hour | 2.5 hours |
| 5 | Content Management | 2 hours | 4.5 hours |
| 6 | UI Components & Polish | 1 hour | 5.5 hours |

**Total Estimated Time: 5.5-6 hours**

## Next Steps

1. Create RBAC API services
2. Update Viewer store with roles/permissions
3. Create admin routes and guards
4. Build admin dashboard page
5. Implement user management
6. Implement content management
7. Polish UI and add confirmations

---

Ready to implement! Let's start with Phase 1.
