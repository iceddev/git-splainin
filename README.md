# git-splainin
GitHub PR Template Chrome Extension

It's time to crush the boilerplate text of Github PR templates. This chrome plugin makes it super easy to get your PRs off to a good start.  All you'll need is your PR template text or a link to the PR template your team uses, and then... you need to install this extension.  And like that you will become Lord of Github PR Maesters.

Let's Begin.

###Download Options:
1. The **easy-peasy option** is to get the latest published version from the Chrome webstore, [go here](https://chrome.google.com/webstore/detail/git-splainin/adbhpaolgdpdjmejdnpakfncfkdneeea).  After installing you will come back here to learn how to [use it right](#use-it-right).
1. The **quite easy option** is to get the latest release from the project Github repo, [go here](https://github.com/iceddev/git-splainin/releases/latest) for that.  You also can get access to prior versions [here](https://github.com/iceddev/git-splainin/releases). Again, after installing you will come back to [install it good](#install-it-good) and [use it right](#use-it-right).
1. Choose the **advanced developer option** to develop and [build from source](#build-from-source). The following instructions assume you have git, node.js and npm. If you don't have these, you have to [get the tools](#get-tools-if-you-need-them) and do a little set-up:


###Get tools if you need them
  * [I need git](http://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
  * [I need node.js and npm](https://nodejs.org/download/)


###Build from Source
  1. **Get the Source:** Go to your terminal, navigate to the directory where you want to keep the files. From within this directory enter:

    `git clone git://github.com/iceddev/git-splainin.git`

  1. **Get into the Project:** Go into the directory and get packages with:

    `cd git-splainin && npm install`

  1. **Build the Application:** Compile all the source and packages into an application you can install from Chrome. In terminal enter:

    `npm run build`

    OR

    _`npm run serve` -- if you are developing and want a dev server to update automatically with file changes._

  1. Feel awesome, the hard part is done.  Now to install in Chrome.


###Install it good:
  1. Verify the application is now unpacked in a known directory.

    ![Verify directory](/readme-images/verify-application-directory.png)

  1. In Chrome, go to the menu --> More Tools --> Extensions

    ![Go to extensions page](/readme-images/chrome-extensions-page.png)

  1. Enable 'Developer Mode'

    !['developer mode' Checkbox](/readme-images/enable-developer-mode.png)

  1. Select "Load Unpacked Extension" and select the folder

    ![Load unpacked extension](/readme-images/load-unpacked-extension.png)

  1. Select application directory

    ![Select application Directory](/readme-images/select-application-directory.png)

  1. Enjoy! You should have confirmation in two places.

    * When you look in the extension listing

    ![git-splaining in extensions listing](/readme-images/git-splainin-extensions-listing.png)

    * When you go to a Github 'New Pull Request' page. You should see an icon in the url bar.

    ![Github pull request page](/readme-images/icon-on-url-field.png)

Your life is about to get incrementally easier.  There are a couple options you need to set and you will be well on your way.


###Use it right:
  1. **Get to the Options page:**

    * From the extensions listing view

    ![Get to option from the extension listing](/readme-images/git-splainin-access-options.png)

    -- Or --

    * by right-clicking on the icon in the url bar

    ![Get to options through the icon](/readme-images/icon-options.png)

  1. **The Options Page:** Simple, no-frills configuration.  You can either manually enter the template text or point to a source.

  ![Look at the Options Page](/readme-images/set-options.png)

  1. **To Point to the Template:** We need to point to the application to the PR template you want to use. You will need to point to HTML, Markdown, or plain text. Github allows you to pull the raw content from the a url, click load and then save, as in the example.

  ![Enter Source URL](/readme-images/load-template-url.png)

  1. **Use it:** When you go a Github New PR Form, you can simply click on the icon and it will inject your template into the form. Voila! Edit the field as needed and 'Create Pull Request'.

  ![Use Git-Splainin](/readme-images/use-git-splainin.png)

###Extra Option:
  1. **Auto-Fill:** You can easily auto-fill anytime you find yourself on a New PR Form.  To do that, go to the options page as outlined in [use it right](#use-it-right). Then click on the 'configuration' tab as shown.

  ![Select Config Tab](/readme-images/auto-fill-config.png)


