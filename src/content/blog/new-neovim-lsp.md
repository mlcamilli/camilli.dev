---
title: 'Neovim LSP Setup 11.2+'
description: "Just a quick how to on utilizing Neovim's new lsp support with mason, mason-lspconfig, nvim-lspconfig"
pubDate: 2025-07-20
tags: ['neovim', 'lsp', 'dotfiles']
---
## New LSP Features
In Neovim [11.0](https://github.com/neovim/neovim/milestone/41?closed=1) they introduced  `lsp.config` and `lsp.enable` functions built-in to Neovim to make configuring and enabling LSP's a lot easer.

While I scoured the internet for a very quick setup that would require a very minimal setup with an easy way to configure, I didn't really find anything that suited my needs.

So after some research thought I would share my findings to help anyone else when it comes to setting this up.

## Enter mason and mason-lspconfig 2.0

After the launch of Neovim 11.0, [mason](https://github.com/mason-org/mason.nvim) and even more notably [mason-lspconfig](https://github.com/mason-org/mason-lspconfig.nvim) had big releases, specifically geared at simplifying LSP setup using the new api.

For context, `mason` is a package manager for Neovim that easily installs and manages LSP servers, DAP servers, linters, and formatters.

`mason-lspconfig` utilizes `mason` and [nvim-lspconfig](https://github.com/neovim/nvim-lspconfig) to easily translate between the two.

The outcome of using all three plugins results in
1. Your LSP's will be automatically installed
2. Your LSP's will be automatically configured with sensible defaults
3. Your LSP's will be automatically enabled when appropriate (navigating a file that the LSP should be presnt for)

## The setup

To set this up, you can just add a single file (if using [lazy.nvim](https://github.com/folke/lazy.nvim))
If you have a plugins folder, you just need to add the following
```lua
return {
  {
    "mason-org/mason-lspconfig.nvim",
    opts = {
      ensure_installed = { "your", "lsps", "here" },
    },
    dependencies = {
      {
        "mason-org/mason.nvim",
        opts = {}
      }
      {
        "neovim/nvim-lspconfig",
      },
    },
  },
}
```
</br>
This will automatically install all your LSPs and configure them.

If you would like to override the default configurations for each lsp, you can add lsp specific configs to `.config/nvim/lsp/` folder.

For example since the majority of my Lua development is in Neovim, I want to add vim to the global workspace so the LSP is aware of it.

To do this I just add this file `.config/nvim/lsp/lua_ls.lua`

> Note that the filename should *exactly* match the lsp name.

```lua
return {
  settings = {
    Lua = {
      diagnostics = {
        globals = { 'vim' }
      },
      runtime = {
        version = 'LuaJIT'
      },
      workspace = {
        library = vim.api.nvim_get_runtime_file("", true),
        checkThirdParty = false
      }
    }
  }
}
```
</br>
This will override these settings in the Lua LSP configuration.
