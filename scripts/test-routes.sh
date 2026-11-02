#!/bin/sh
# Smoke-test every route. Start the API first: npm run dev
# Usage: ./scripts/test-routes.sh [base-url]

set -u

BASE_URL="${1:-${BASE_URL:-http://localhost:3000}}"
fail=0
LAST_BODY=""

check() {
    method=$1
    path=$2
    expect=$3
    data=${4-}

    if [ -n "$data" ]; then
        raw=$(curl -sS -X "$method" "$BASE_URL$path" \
            -H "Content-Type: application/json" \
            -d "$data" \
            -w "\n%{http_code}") || {
            printf 'FAIL %s %s (request failed)\n' "$method" "$path"
            fail=$((fail + 1))
            return
        }
    else
        raw=$(curl -sS -X "$method" "$BASE_URL$path" -w "\n%{http_code}") || {
            printf 'FAIL %s %s (request failed)\n' "$method" "$path"
            fail=$((fail + 1))
            return
        }
    fi

    status=$(printf '%s\n' "$raw" | tail -n 1)
    LAST_BODY=$(printf '%s\n' "$raw" | sed '$d')

    if [ "$status" = "$expect" ]; then
        printf 'OK   %s %s -> %s\n' "$method" "$path" "$status"
    else
        printf 'FAIL %s %s -> %s (expected %s)\n%s\n' "$method" "$path" "$status" "$expect" "$LAST_BODY"
        fail=$((fail + 1))
    fi
}

check GET /health 200
check GET /api/v1/opening-hours 200
check GET /api/v1/books 200
check GET "/api/v1/books?author=George%20Orwell" 200
check GET "/api/v1/books?search=gatsby" 200
check GET /api/v1/books/1 200

check POST /api/v1/books 201 '{"title":"Route Test","author":"Script"}'
book_id=$(printf '%s' "$LAST_BODY" | sed -n 's/.*"id":\([0-9][0-9]*\).*/\1/p')

if [ -n "$book_id" ]; then
    check PUT "/api/v1/books/$book_id" 200 '{"title":"Route Test Updated"}'
    check DELETE "/api/v1/books/$book_id" 204
else
    printf 'FAIL could not read created book id\n'
    fail=$((fail + 1))
fi

check GET /api/v1/books/1/reviews 200
check POST /api/v1/books/1/reviews 201 '{"bookId":1,"userId":1,"review":"Worth reading","rating":5}'

check GET /api/v1/loans 200
check POST /api/v1/loans 201 '{"bookId":1,"userId":1}'

if [ "$fail" -eq 0 ]; then
    printf 'All routes passed\n'
else
    printf '%s check(s) failed\n' "$fail"
    exit 1
fi
