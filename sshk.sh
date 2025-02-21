switchSshKey() {

clear

echo "
SSH Key Switcher - by @dianamartine
-----------------------------------
"

select key in ~/.ssh/*.pub; do
    if [ -z "$key" ]; then
        echo "Invalid option"
    else
    key_name=$(basename "$key" .pub)
    echo "Switching to $key_name"

    ssh-add -D
    ssh-add ~/.ssh/$key_name

    if [ $key_name == "gitlab" ]; then
        git config --global user.email "gitlab_email"
        git config --global user.name "gitlab_user"
    elif [ $key_name == "github" ]; then
        git config --global user.email "github_email"
        git config --global user.name "github_user"
    elif [ $key_name == "bitbucket" ]; then
        git config --global user.email "bitbucket_email"
        git config --global user.name "bitbucket_user"
    fi

    echo "Git user configured as $(git config --global user.name) <$(git config --global user.email)>"

    echo "Done"

        break
    fi
done
}

switchSshKey;