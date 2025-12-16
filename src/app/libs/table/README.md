# `wtable` — Table component

Standalone, signal-friendly data table for Angular v20 with BEM classes, search, sort, pagination, and action slots.

## ✨ Features

- Angular v20 `input()` signals; OnPush.
- BEM styles: `.wtable`, elements like `__header`, `__search`, `__pagination`.
- Client search (pipe) + sortable headers + pagination.
- Header actions and per-row actions via templates.
- Works with `<wbutton>` (or `button[wbutton]`).

## 📦 Install

```bash
waw add ngx-table
```

## 🧩 Import

```ts
import { TableComponent } from 'src/app/libs/table/table.component';

@Component({
	imports: [TableComponent],
})
export class Page {}
```

## 🧪 Usage

```html
<wtable
	[title]="'Users'"
	[columns]="[{title:'Name',field:'name'},{title:'Email',field:'email'}]"
	[rows]="users"
	[config]="{ searchable: true, pageSizeOptions:[10,20,50], perPage: 10, allDocs: true }"
>
</wtable>
```

### Custom cells / actions

```html
<ng-template cell="email" let-row>
	<a [href]="'mailto:'+row.email">{{ row.email }}</a>
</ng-template>

<ng-template actions>
	<button wbutton (wClick)="edit(row)">edit</button>
	<button wbutton (wClick)="remove(row)">delete</button>
</ng-template>
```

## 🎛️ Config (partial)

- `searchable: boolean`
- `pageSizeOptions: number[]`
- `perPage: number | -1`
- `page: number`
- `allDocs: boolean`
- Optional callbacks: `paginate(page)`, `setPerPage(n)`, `create()`
- `headerButtons: { text?: string; icon?: string; class?: string; click:()=>void }[]`

## License

MIT © Web Art Work
