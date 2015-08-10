#!/usr/bin/env bash


# utility
#########

display_help() {
  cat <<-EOF

  A utility for managing pistachios.

  Usage: manage.sh <command> [options]

  Commands:
    add <git_remote>     Add a pistachio
    delete <name>        Delete a pistachio
    update               Updates all pistachios


  Options:
    --auto-commit        Automatically commit+push additions and deletions
                         can be specified with envvar `GIT_AUTO_COMMIT=true`

EOF

  if [ $# -eq 0 ]; then
    exit 0
  fi

  exit $1
}

error () {
  echo -en >&2 "\033[31m"
  echo -e >&2 "$@"
  echo -en >&2 "\033[0m"
  exit 1
}


# globals
#########

type greadlink >/dev/null 2>&1 && CWD="$(dirname "$(greadlink -f "$0")")" || \
  CWD="$(dirname "$(readlink -f "$0")")"
AUTO_COMMIT=${GIT_AUTO_COMMIT:-false}


# functions
###########

pistachio_add(){
  local REMOTE=$1
  local TARGET=$(basename "$REMOTE" .git)

  echo "adding ${TARGET}..."

  if [ -z "$REMOTE" ]; then
    error "please provide git rempote URL"
  fi

  cd $CWD/pistachios
  git submodule add --force $REMOTE $TARGET

  # add pistachio to modman
  local LINE="@import pistachios/$TARGET"
  grep -q "$LINE" "$CWD/modman" || echo "$LINE" >> "$CWD/modman"


  if $AUTO_COMMIT; then
    git add $TARGET
    git commit -m "auto-adding ${TARGET}"
    git push
  fi

}

pistachio_delete(){
  echo "deleting $1..."

  if [ -z "$1" ]; then
    error "please provide pistachio to delete"
  fi

  TARGET=pistachios/$1

  if [ ! -d $CWD/$TARGET ]; then
    error "pistachio $1 does not exist"
  fi

  cd $CWD
  git rm $TARGET

  # remove from modman (use # as delimeter to support slashes in path)
  sed -i "\#@import $TARGET#d" modman

  if $AUTO_COMMIT; then
    git add modman
    git commit -m "auto-removing ${1}"
    git push
  fi
}

pistachio_update(){
  cd $CWD

  git submodule update --remote --checkout --recursive --force
  git add -u
  
  if $AUTO_COMMIT; then
    cd pistachios
    git commit -m "auto-updating pistachios"
    git push
  fi
}



# runtime
#########

runstr="display_help"

if [ $# -eq 0 ]; then
  display_help 1
else
  while [ $# -ne 0 ]; do
    case $1 in
      -h|--help|help)    display_help ;;
      add)               runstr="pistachio_add $2" ; shift ;;
      delete)            runstr="pistachio_delete $2" ; shift ;;
      update)            runstr="pistachio_update" ;;
      --auto-commit)     AUTO_COMMIT=true ;;
      *)                 echo "invalid option: $1" ; display_help 1 ;;
    esac
    shift
  done

  $runstr
fi
