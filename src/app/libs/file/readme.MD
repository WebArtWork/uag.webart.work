# Ngx File (WAW)

Signal-based file picker/uploader with crop support, two-way `[(wModel)]`, CVA, and Virtual Form integration.

- Single/multiple
- Optional image preview
- Optional crop modal (`cropWidth` + `cropHeight`)
- `[(wModel)]` (string | string[] | null)
- `[formId]` + `[formKey]` Virtual Form sync

### Basic

```html
<ngx-file [(wModel)]="avatarUrl"></ngx-file>
```

### Multiple + crop

```html
<ngx-file
	[multiple]="true"
	[cropWidth]="1080"
	[cropHeight]="1080"
	[(wModel)]="galleryUrls"
>
</ngx-file>
```

### Virtual form

```html
<ngx-file [formId]="formId" [formKey]="'photoUrl'"></ngx-file>
```
