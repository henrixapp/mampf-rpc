# First build the PDF compressor Web assembly binary
FROM golang:1.16 AS build-pdfcomprezzor
WORKDIR /go/src
COPY pdfcomprezzor/go.mod .
COPY pdfcomprezzor/go.sum .
COPY pdfcomprezzor/main.go .
RUN GOOS=js GOARCH=wasm go build -o pdfcomprezzor.wasm

# Now build the actual mampf application
FROM ruby:2.7.2
ENV RAILS_ENV=production
EXPOSE 3000

# https://github.com/nodesource/distributions#installation-instructions
RUN curl -sL https://deb.nodesource.com/setup_10.x | bash - && \
    curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list && \
    curl -sS https://www.postgresql.org/media/keys/ACCC4CF8.asc | apt-key add - && echo "deb http://apt.postgresql.org/pub/repos/apt/ `lsb_release -cs`-pgdg main" | tee  /etc/apt/sources.list.d/pgdg.list && \
    sed -i "s/deb\.debian\.org/ftp.halifax\.rwth-aachen.de/g" /etc/apt/sources.list && \
    apt-get update && \
    apt-get install -y --no-install-recommends \
        ffmpeg ghostscript imagemagick libarchive-tools nodejs pdftk \
        postgresql-client-12 sqlite3 wget wait-for-it  shared-mime-info yarn && \
    rm -rf /var/lib/apt/lists/* && \
    apt-get clean

RUN sed -i '/disable ghostscript format types/,+6d' /etc/ImageMagick-6/policy.xml
WORKDIR /usr/src/app

COPY --from=build-pdfcomprezzor /go/src/pdfcomprezzor.wasm  /usr/src/app/public/pdfcomprezzor/pdfcomprezzor.wasm
COPY --from=build-pdfcomprezzor /go/src/pdfcomprezzor.wasm  /pdfcomprezzor.wasm
COPY ./Gemfile ./Gemfile.lock ./yarn.lock ./package.json /usr/src/app/
RUN bundle install
COPY  ./ /usr/src/app/
RUN RAILS_ENV=test TEST_DATABASE_ADAPTER=postgresql rake assets:precompile
