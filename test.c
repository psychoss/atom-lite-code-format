#include <stdlib.h>
#include <stdio.h>

struct data {
  int nr;
  char const *value;
} dat[] = { { 1, "Foo" }, { 2, "Bar" }, { 3, "Hello" }, { 4, "World" } };

int data_cmp(void const *lhs, void const *rhs) {
  struct data const *const l = lhs;
  struct data const *const r = rhs;
  return (l->nr > r->nr) - (l->nr < r->nr);
}

int main(void) {
  struct data key = { .nr = 3 };
  struct data const *res = bsearch(&key, dat, sizeof(dat) / sizeof(dat[0]),
                                   sizeof(dat[0]), data_cmp);
  if (!res) {
    printf("No %d not found\n", key.nr);
  } else {
    printf("No %d: %s\n", res->nr, res->value);
  }
}

 // cc /home/psycho/github/atom-format/test.c -o /home/psycho/github/atom-format/test && /home/psycho/github/atom-format/test
