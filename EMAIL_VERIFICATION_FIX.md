# 🔧 Email Verification Infinite Loop Fix

## 🚨 **The Problem**

After successful email verification, the page was stuck in an infinite loop of 400 Bad Request errors.

## 🔍 **Root Cause**

The issue was in the `verify-email/page.tsx` component's `useEffect` dependency array:

```tsx
// ❌ BROKEN CODE:
useEffect(() => {
  // verification logic...
  verifyEmailMutation.mutate({ verificationToken: token, email });
}, [router, verifyEmailMutation]); // ← verifyEmailMutation causes infinite loop!
```

### **Why This Caused Infinite Loop:**

1. **TanStack Query Mutations are objects** that get recreated on every render
2. **useEffect dependency array** sees `verifyEmailMutation` as "changed" every time
3. **Effect runs again** → calls `mutate()` again → triggers re-render → repeats infinitely
4. **Result**: Endless 400 Bad Request errors until redirect timeout

## ✅ **The Fix**

```tsx
// ✅ FIXED CODE:
export default function VerifyEmailPage() {
  const router = useRouter();
  const verifyEmailMutation = useVerifyEmail();
  const hasVerified = useRef(false); // Prevent multiple verification attempts

  useEffect(() => {
    // Prevent running multiple times
    if (hasVerified.current) return;

    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    const email = urlParams.get("email");

    if (!token || !email) {
      toast.error("Invalid verification link.");
      router.replace("/auth/login");
      return;
    }

    hasVerified.current = true;
    verifyEmailMutation.mutate({ verificationToken: token, email });
  }, [router]); // ← Removed verifyEmailMutation from dependencies

  // ... rest of component
}
```

### **Key Changes:**

1. **Removed `verifyEmailMutation`** from useEffect dependencies
2. **Added `useRef(false)`** to track if verification has already been attempted
3. **Early return** if verification already started to prevent multiple calls

## 🎯 **Expected Behavior Now**

1. ✅ User clicks verification link
2. ✅ Page loads and calls verification API **once**
3. ✅ Shows "Verifying your email..." message
4. ✅ On success: Shows "Email Verified!" and redirects to login
5. ✅ On failure: Shows error message
6. ✅ **No infinite loop or repeated API calls**

## 📚 **Lesson Learned**

**Never include TanStack Query mutations/queries in useEffect dependencies** unless you specifically need to react to their changes. They are objects that change on every render.

**Common React Hook Dependencies to Avoid:**

- ❌ TanStack Query mutations/queries
- ❌ Function objects (unless memoized with useCallback)
- ❌ Object/array literals created inline
- ✅ Primitive values, refs, memoized functions, router

This fix should completely eliminate the infinite loop issue! 🎉
